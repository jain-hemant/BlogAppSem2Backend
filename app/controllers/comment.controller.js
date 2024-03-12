import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import { response } from "express";

// Create a new comment
const createComment = async (req, res) => {
  const { blog, content, creator } = req.body;
  console.log(blog, content, creator);
  if (!blog || !content || !creator) {
    return res.status(400).json({ message: "Fields `blog`, `content`, and `creator` are required" });
  }

  if (!mongoose.isValidObjectId(blog) || !mongoose.isValidObjectId(creator)) {
    return res.status(400).json({ message: "Invalid blog or creator ID" });
  }

  try {
    const newComment = new Comment({
      blog,
      content,
      creator
    });
    const savedComment = await newComment.save();
    savedComment.populate('creator')
    // Add the newly created comment to the blog's comments array
    await Blog.findByIdAndUpdate(blog, { $push: { comments: savedComment._id } });
    return res.json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a comment by ID
const getCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid commentId" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    return comment;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment by ID
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid commentId" });
    }
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!updatedComment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    return updatedComment;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid commentId" });
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    await Blog.findOneAndUpdate({ _id: deletedComment.blog }, { $pull: { comments: commentId } });
    return deletedComment;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getAllCommentsByBlog(req, res) {
  const { blogId } = req.params

  const comments = await Comment.find({ blog: blogId }).populate('creator');
  return res.json({ comments, blogId });
}
export {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getAllComments,
  getAllCommentsByBlog
};