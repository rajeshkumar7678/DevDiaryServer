const BlogModel = require("../model/blog.model");

const GetBlogs = async (req, res) => {
  try {
    let blogs = await BlogModel.find();
    res.status(200).send({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const CreateBlog = async (req, res) => {
  try {
    let { title, content, author, tags } = req.body;
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = req.body.content.split(" ").length;
    const timeToRead = Math.ceil(wordCount / wordsPerMinute);
    let newBlog = new BlogModel({
      title,
      content,
      author,
      tags,
      timeToRead,
    });
    let result = await newBlog.save();
    res.status(200).send({ message: "Blog created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  GetBlogs,
  CreateBlog,
};
