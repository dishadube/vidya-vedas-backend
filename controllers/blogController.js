import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) return res.status(400).json({ msg: "Missing fields" });
    const blog = await Blog.create({ title, content, author });
    res.status(201).json({ blog });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const getBlog = async (req, res) => {
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs);
};

export const deleteBLog = async (req, res) => {
  const dltBlog = await Blog.findOneAndDelete('author')
  res.json(dltBlog);

}

