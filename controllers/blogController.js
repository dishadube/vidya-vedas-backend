import Blog from "../models/Blog.js";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Author comes from token middleware
    const author = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    if (!author) {
      return res.status(401).json({ msg: "Unauthorized user" });
    }

    const blog = await Blog.create({
      title,
      content
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= GET ALL BLOGS ================= */
export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.json({
      success: true,
      msg: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
