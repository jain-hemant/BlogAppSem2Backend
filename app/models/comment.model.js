import mongoose from 'mongoose';

// Comment schema
const CommentSchema = new mongoose.Schema({
  blog:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Blog"
  },
  content: {
    type: String,
    required: true
  },
   creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
  likes:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
  dislikes:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
  totalLikes:{
    type:Number,
    default:0
  },
   totalDisLikes:{
    type:Number,
    default:0
  },
  threadComments:[{type:mongoose.Schema.Types.ObjectId, ref:"Thread"}],
  active: {type:Boolean, default:true}
});

// Create the Comment model from the schema
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;