const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [String], // Array of tags for the blog post
  timeToRead: { type: Number, required: true }, // Time required to read the blog post
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      name: String,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
