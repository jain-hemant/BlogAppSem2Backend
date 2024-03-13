import mongoose from "mongoose";
import Thread from "../models/threadComment.model.js";

// Create a new thread
const createThread = async (req, res) => {
 const {blog, parentComment, content, creator} = req.body;

 if(!blog || !parentComment || !content || !creator) {
  return res.status(400).json({ message: "Fields `blog`, `parentComment`, `content`, and `creator` are required" });
 }

 if(!mongoose.isValidObjectId(blog) || !mongoose.isValidObjectId(parentComment) || !mongoose.isValidObjectId(creator)) {
  return res.status(400).json({ message: "Invalid blog, parentComment, or creator ID" });
 }

 try {
  const newThread = new Thread({
   blog,
   parentComment,
   content,
   creator
  });
  const savedThread = await newThread.save();
  return savedThread;
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Read a thread by ID
const getThreadById = async (req, res) => {
 const {threadId} = req.params;
 try {
  if (!mongoose.Types.ObjectId.isValid(threadId)) {
   return res.status(400).json({ message: "Invalid threadId" });
  }
  const thread = await Thread.findById(threadId);
  if (!thread) {
   return res.status(400).json({ message: "Thread not found" });
  }
  return thread;
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Update a thread by ID
const updateThread = async (req, res) => {
 const {threadId} = req.params;
 const {content} = req.body;
 try {
  if (!mongoose.Types.ObjectId.isValid(threadId)) {
   return res.status(400).json({ message: "Invalid threadId" });
  }
  const updatedThread = await Thread.findByIdAndUpdate(threadId, { content }, { new: true });
  if (!updatedThread) {
   return res.status(400).json({ message: "Thread not found" });
  }
  return updatedThread;
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Delete a thread by ID
const deleteThread = async (req, res) => {
 const {threadId} = req.params;
 try {
  if (!mongoose.Types.ObjectId.isValid(threadId)) {
   return res.status(400).json({ message: "Invalid threadId" });
  }
  const deletedThread = await Thread.findByIdAndDelete(threadId);
  if (!deletedThread) {
   return res.status(400).json({ message: "Thread not found" });
  }
  return deletedThread;
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const getAllThreads = async (req, res) => {
 try {
  const threads = await Thread.find();
  res.json(threads);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

export {
 createThread,
 updateThread,
 deleteThread,
 getThreadById,
 getAllThreads
};