// models/Blog.js
import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

export default mongoose.model("Blog", blogsSchema);
