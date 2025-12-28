import Blog from "../models/Blog.js";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    if (!author) {
      return res.status(401).json({ msg: "Unauthorized user" });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
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

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // only author can delete
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await blog.deleteOne();

    res.json({ success: true, msg: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
