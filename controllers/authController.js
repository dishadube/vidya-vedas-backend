import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
 
  } catch (err) {
    console.error("Error verifying transporter:", err);
  }
};

//Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (password.length < 10) {
      return res.status(400).json({ msg: "Password must be at least 10 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    console.error(" Register error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

//Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Add this line to make sure secret exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      msg: "Login successful",
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
};


//Send OTP
//Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      // return 404 so client knows the email isn't registered
      return res.status(404).json({ msg: "Email not registered" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    // save OTP atomically and check for DB errors
    const updated = await User.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { new: true }
    );

    if (!updated) {
      return res.status(500).json({ msg: "Failed to save OTP" });
    }

    // email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code - valid 5 minutes",
      html: `
        <div>
          <p>Hi ${user.name || ""},</p>
          <p>Your OTP code is:</p>
          <h2 style="letter-spacing:4px">${otp}</h2>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    // send mail and catch specific nodemailer errors
    await transporter.sendMail(mailOptions);

    // success
    return res.json({ msg: "OTP sent successfully" });
  } catch (error) {
    if (error && error.code) {
      return res.status(500).json({ msg: "Mail service error", code: error.code });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//OTP Verification
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp,
    otpExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  res.json({ msg: "OTP verified successfully" });
};

//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashed, otp: null, otpExpires: null }
    );

    res.json({ msg: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

//authController.js

