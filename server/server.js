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
   🔥 MongoDB Connection
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err.message));

/* ================================
   🏠 Test Route
================================ */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ================================
   👤 Register
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
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profession: role === "freelancer" ? profession : undefined,
      skills: role === "freelancer" ? skills : undefined,
      experience: role === "freelancer" ? experience : undefined,
      bio: role === "freelancer" ? bio : undefined,
    });

    res.status(201).json({ message: "Registered successfully", user });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🔐 Login
================================ */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   👤 Get Logged In User
================================ */
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📌 Create Job (Client Only)
================================ */
app.post("/api/gigs", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "client")
      return res.status(403).json({ message: "Only clients can post jobs" });

    const { title, description, budget, skills } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      skills,
      createdBy: req.user.id,
    });

    res.status(201).json(gig);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📌 Get All Jobs
================================ */
app.get("/api/gigs", async (req, res) => {
  try {
    const gigs = await Gig.find().populate("createdBy", "name role");
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🤝 Send Connection Request (Both)
================================ */
app.post("/api/connect", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (receiverId === req.user.id)
      return res.status(400).json({ message: "Cannot connect to yourself" });

    const existing = await Connection.findOne({
      $or: [
        { client: req.user.id, freelancer: receiverId },
        { client: receiverId, freelancer: req.user.id }
      ]
    });

    if (existing)
      return res.status(400).json({ message: "Connection already exists" });

    const connection = await Connection.create({
      client: req.user.role === "client" ? req.user.id : receiverId,
      freelancer: req.user.role === "freelancer" ? req.user.id : receiverId,
      status: "pending"
    });

    res.status(201).json(connection);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📥 Get My Connections (All)
================================ */
app.get("/api/my-connections", authMiddleware, async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { client: req.user.id },
        { freelancer: req.user.id }
      ]
    })
      .populate("client", "name role")
      .populate("freelancer", "name role");

    res.json(connections);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   ✅ Accept Connection
================================ */
app.patch("/api/connect/:id", authMiddleware, async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection)
      return res.status(404).json({ message: "Not found" });

    if (
      connection.client.toString() !== req.user.id &&
      connection.freelancer.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    connection.status = "accepted";
    await connection.save();

    res.json({ message: "Connection accepted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   💬 Send Message
================================ */
app.post("/api/message", authMiddleware, async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      text,
    });

    res.status(201).json(message);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   💬 Get Conversation
================================ */
app.get("/api/messages/:userId", authMiddleware, async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🚀 Start Server
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
