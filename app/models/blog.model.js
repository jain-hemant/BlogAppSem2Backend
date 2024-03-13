import mongoose from 'mongoose';
import Thread from './threadComment.model.js';

// Blog schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true
  },
  blogContent: {
    type: String,
    required: true,
  },
   creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
  totalLikes:{
    type:Number,
    default:0
  },
   totalDisLikes:{
    type:Number,
    default:0
  },
  totalViews:{
    type:Number,
    default:0
  },
  likes:[{type: mongoose.Schema.Types.ObjectId,ref:"User", default:[]}],
  dislikes:[{type: mongoose.Schema.Types.ObjectId,ref:"User", default:[]}],
  comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment", default:[]}],
  isActive: {type:Boolean, default:false}
});

BlogSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  const blog = this;
  try {
    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: blog._id });
    await Thread.deleteMany({ blog: blog._id });
    next();
  } catch (error) {
    next(error);
  }
})
// Create the Blog model from the schema
const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;