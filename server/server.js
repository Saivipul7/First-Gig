import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./models/User.js";
import Gig from "./models/Gig.js";
import Connection from "./models/Connection.js";
import Message from "./models/Message.js";
import authMiddleware from "./authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================================
   🔥 DATABASE
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

/* ================================
   🏠 TEST
================================ */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ================================
   👤 REGISTER
================================ */
app.post("/api/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profession,
      skills,
      experience,
      bio,
      category
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      profession,
      skills,
      experience,
      bio,
      category
    });

    res.json(user);

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🔐 LOGIN
================================ */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   👤 GET LOGGED USER
================================ */
app.get("/api/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

/* ================================
   ✏ EDIT USER PROFILE
================================ */
app.patch("/api/me", authMiddleware, async (req, res) => {
  try {
    const { name, profession, bio, skills, category } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (profession !== undefined) user.profession = profession;
    if (bio !== undefined) user.bio = bio;
    if (skills) user.skills = skills;
    if (category) user.category = category;

    await user.save();
    res.json(user);

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🧑‍💻 GET FREELANCERS (WITH FILTER)
================================ */
app.get("/api/freelancers", async (req, res) => {
  try {
    const { category, search } = req.query; // Added search
    const filter = { role: "freelancer" };

    if (category) filter.category = category;

    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive regex
      filter.$or = [
        { name: searchRegex },
        { profession: searchRegex },
        { skills: searchRegex }
      ];
    }

    const freelancers = await User.find(filter).select("-password");
    res.json(freelancers);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📌 CREATE REQUIREMENT (CLIENT)
================================ */
app.post("/api/gigs", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "client")
      return res.status(403).json({ message: "Only clients can post" });

    const gig = await Gig.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json(gig);

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📌 GET ALL REQUIREMENTS
================================ */
app.get("/api/gigs", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  const gigs = await Gig.find(filter)
    .populate("createdBy", "name role");
  res.json(gigs);
});

/* ================================
   ✏ EDIT REQUIREMENT (CLIENT ONLY)
================================ */
app.patch("/api/gigs/:id", authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig)
      return res.status(404).json({ message: "Not found" });

    if (gig.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    gig.title = req.body.title || gig.title;
    gig.description = req.body.description || gig.description;
    gig.budget = req.body.budget || gig.budget;

    await gig.save();

    res.json(gig);

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🤝 SEND CONNECTION REQUEST
================================ */
app.post("/api/connect", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (receiverId === req.user.id)
      return res.status(400).json({ message: "Cannot connect yourself" });

    const existing = await Connection.findOne({
      $or: [
        { sender: req.user.id, receiver: receiverId },
        { sender: receiverId, receiver: req.user.id }
      ]
    });

    if (existing)
      return res.status(400).json({ message: "Already requested" });

    const connection = await Connection.create({
      sender: req.user.id,
      receiver: receiverId,
      status: "pending"
    });

    res.json(connection);

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📥 GET MY CONNECTIONS
================================ */
app.get("/api/my-connections", authMiddleware, async (req, res) => {

  const connections = await Connection.find({
    $or: [
      { sender: req.user.id },
      { receiver: req.user.id }
    ]
  })
    .populate("sender", "name role profession skills bio")
    .populate("receiver", "name role profession skills bio");

  res.json(connections);
});

/* ================================
   ✅ ACCEPT CONNECTION
================================ */
app.patch("/api/connect/:id", authMiddleware, async (req, res) => {

  const connection = await Connection.findById(req.params.id);

  if (!connection)
    return res.status(404).json({ message: "Not found" });

  // ONLY RECEIVER CAN ACCEPT
  if (connection.receiver.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  connection.status = "accepted";
  await connection.save();

  res.json({ message: "Connection Accepted" });
});

/* ================================
   💬 SEND MESSAGE (ONLY IF CONNECTED)
================================ */
app.post("/api/message", authMiddleware, async (req, res) => {

  const { receiverId, text } = req.body;

  const connection = await Connection.findOne({
    $or: [
      { sender: req.user.id, receiver: receiverId, status: "accepted" },
      { sender: receiverId, receiver: req.user.id, status: "accepted" }
    ]
  });

  if (!connection)
    return res.status(403).json({ message: "Not connected" });

  const message = await Message.create({
    sender: req.user.id,
    receiver: receiverId,
    text
  });

  res.json(message);
});

/* ================================
   💬 GET CHAT
================================ */
app.get("/api/messages/:id", authMiddleware, async (req, res) => {

  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.id },
      { sender: req.params.id, receiver: req.user.id }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});

/* ================================
   👑 ADMIN ROUTES
================================ */
import adminMiddleware from "./adminMiddleware.js";

// GET STATS
app.get("/api/admin/stats", adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalGigs = await Gig.countDocuments();
    const totalConnections = await Connection.countDocuments();

    res.json({
      totalUsers,
      totalGigs,
      totalConnections
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL USERS
app.get("/api/admin/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE USER
app.delete("/api/admin/users/:id", adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🌱 SEED ADMIN (RUN ONCE)
================================ */
app.post("/api/seed-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "admin@firstgig.com" });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@firstgig.com",
      password: hashed,
      role: "admin"
    });

    res.json(admin);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🚀 START SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
