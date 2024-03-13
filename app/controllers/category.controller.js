import mongoose from "mongoose";
import Category from "../models/category.model.js";

// Create a new category
const createCategory = async (req, res) => {
 const {title, description, creator} = req.body;

 if(!title || !creator) {
  return res.status(400).json({ message: "Fields `title` and `creator` are required" });
 }

 if(!mongoose.isValidObjectId(creator)) {
  return res.status(400).json({ message: "Invalid creator ID" });
 }

 try {
  const newCategory = new Category({
   title,
   description,
   creator
  });
  const savedCategory = await newCategory.save();
  res.json({savedCategory})
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Read a category by ID
const getCategoryById = async (req, res) => {
 const {categoryId} = req.params;
 try {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
   return res.status(400).json({ message: "Invalid categoryId" });
  }
  const category = await Category.findById(categoryId);
  if (!category) {
   return res.status(400).json({ message: "Category not found" });
  }
  return category;
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Update a category by ID
const updateCategory = async (req, res) => {
 const {categoryId} = req.params;
 const {title, description, isActive} = req.body;
 try {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
   return res.status(400).json({ message: "Invalid categoryId" });
  }
  const updateData = {};
  if (title) {
   updateData.title = title;
  }
  if (description) {
   updateData.description = description;
  }

  if(isActive){
    updateData.isActive = isActive
  }
  const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
  if (!updatedCategory) {
   return res.status(400).json({ message: "Category not found" });
  }
  return res.json(updatedCategory);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
 const {categoryId} = req.params;
 try {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
   return res.status(400).json({ message: "Invalid categoryId" });
  }
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
   return res.status(400).json({ message: "Category not found" });
  }
  return res.json({categoryId});
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const getAllCategories = async (req, res) => {
 try {
  const categories = await Category.find();
  res.json(categories);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

export {
 createCategory,
 updateCategory,
 deleteCategory,
 getCategoryById,
 getAllCategories
};