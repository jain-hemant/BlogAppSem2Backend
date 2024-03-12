import mongoose from "mongoose";
import Blog from "../models/blog.model.js";

// Create a new blog
const createBlog = async (req, res) => {
  const {title, category, blogContent, creator} = req.body;

  if(!title||!category||!blogContent||!creator ) {
    return res.status(400).json({message: "All fields `title`, `category`, `blogContent` and `creator` are required"});
  }

  if(!mongoose.isValidObjectId(creator) || !mongoose.isValidObjectId(category)){
    return res.status(400).json({message: "Invalid category or creator ID"});
  }

  try {
    const newBlog = new Blog({
        title, category, blogContent, creator
    });
    const savedBlog = await newBlog.save();
    return res.json(savedBlog);
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: error.message });
  }
};

// Read a blog by ID
const getBlogById = async (req, res) => {
  const {blogId} = req.params;
  console.log(blogId);
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({message: "Invalid blogId"});
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
       return res.status(400).json({message: "Blog not found"});
    }
    return res.json(blog);
  } catch (error) {
   // Send an error response if something goes wrong
    res.status(500).json({ message: error.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  const {blogId} = req.params;
  const {title, blogContent, isActive } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({message: "Invalid blogId"});
    }
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (blogContent) {
      updateData.blogContent = blogContent;
    }
    if(isActive){
      updateData.isActive = isActive
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
    if (!updatedBlog) {
       return res.status(400).json({message: "Blog not found"});
    }
    return updatedBlog;
  } catch (error) {
    throw new Error("Error updating blog: " + error.message);
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  const {blogId} = req.params;
  try {
     if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({message: "Invalid blogId"});
    }
    const deletedBlog = await Blog.deleteOne({_id: blogId});
    if (!deletedBlog) {
       return res.status(400).json({message: "Blog not found"});
    }
    return deletedBlog;
  } catch (error) {
    throw new Error("Error deleting blog: " + error.message);
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllBlogsByCategory = async (req, res) => {
  const {categoryId} = req.params
  try {
    const blogs = await Blog.find({category: categoryId}).select('-__v').populate('creator', '-password -__v').populate('category');
    res.json({blogs, categoryId});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getAllBlogs,
    getAllBlogsByCategory
}