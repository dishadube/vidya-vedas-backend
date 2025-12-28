import express from "express";
import {
  createBlog,
  getBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, createBlog);
router.get("/", getBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
