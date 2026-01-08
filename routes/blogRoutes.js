import express from "express";
import { createBlog, getBlog } from "../controllers/blogController.js";
import { requireAuth } from "../Middleware/auth.js";
const router = express.Router();

router.post("/create", requireAuth, createBlog); // 👈 requireAuth added
router.get("/", getBlog);

export default router;
