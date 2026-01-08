import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("_id name email username");
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ msg: "Server auth error" });
  }
};
