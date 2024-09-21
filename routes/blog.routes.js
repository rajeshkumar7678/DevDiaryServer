const express = require("express");
const { GetBlogs, CreateBlog } = require("../controller/blog.controller");
const BlogModel = require("../model/blog.model");

const blogRouter = express.Router();

blogRouter.get("/", GetBlogs);

blogRouter.post("/create", CreateBlog);

blogRouter.put("/update-time-to-read", async (req, res) => {
  try {
    const wordsPerMinute = 200; // Average reading speed

    // Find all blogs
    const blogs = await BlogModel.find();

    // Iterate through each blog and update the "timeToRead" property
    for (const blog of blogs) {
      const wordCount = blog.content.split(" ").length;
      const timeToRead = Math.ceil(wordCount / wordsPerMinute);

      // Update the blog with the new "timeToRead" value
      blog.timeToRead = timeToRead;
      await blog.save();
    }

    res
      .status(200)
      .send({ message: "Time to read updated for all blog posts." });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating time to read." });
  }
});

module.exports = blogRouter;
