import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Gig from "./models/Gig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  res.send("Backend is running 🚀");
});

/* ================================
   👤 Register API (Updated)
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
      bio
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,

      // 🔥 Only save freelancer fields if role is freelancer
      profession: role === "freelancer" ? profession : undefined,
      skills: role === "freelancer" ? skills : undefined,
      experience: role === "freelancer" ? experience : undefined,
      bio: role === "freelancer" ? bio : undefined
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   🔐 Login API
================================ */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
/* ================================
   👤 Get Logged In User
================================ */
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


/* ================================
   📌 Create Gig
================================ */
app.post("/api/gigs", async (req, res) => {
  try {
    const { title, description, budget, skills, createdBy } = req.body;

    const newGig = await Gig.create({
      title,
      description,
      budget,
      skills,
      createdBy
    });

    res.status(201).json({
      message: "Gig created successfully",
      gig: newGig
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================================
   📌 Get All Gigs
================================ */
app.get("/api/gigs", async (req, res) => {
  try {
    const gigs = await Gig.find().populate("createdBy", "name email");

    res.status(200).json(gigs);

  } catch (error) {
    console.log(error);
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
