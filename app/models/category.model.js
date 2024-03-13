import mongoose from 'mongoose'
import Blog from './blog.model.js'

const CategorySchema =  new mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    title:{
        type: String, required:true,
    },
     description:{
        type: String, 
    },
    isActive:{
        type: Boolean, default:false
    }
})

CategorySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const category = this;
  console.log(category);
  try {
    // Delete all blogs associated with the category
    await Blog.deleteMany({ category: category._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;