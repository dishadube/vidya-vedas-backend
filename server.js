import dotenv from "dotenv";
dotenv.config(); // Load env first ✅

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import { verifyTransporter } from "./controllers/authController.js";

const app = express();

/* -------------------- BASIC MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

verifyTransporter(); // Email config check ✅

/* -------------------- MONGODB CONNECTION -------------------- */
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// Ensure DB connection for every request (Vercel safe)
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToMongoDB();
  }
  next();
});

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => {
  res.send("API server running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/student", studentRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ ok: true, msg: "API test route working" });
});

/* -------------------- 404 HANDLER (ALWAYS LAST) -------------------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

export default app; // Required for Vercel serverless
