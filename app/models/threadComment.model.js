import mongoose from 'mongoose';

// Comment schema
const ThreadSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Blog"
    },
  parentComment:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Comment"
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
  totalLikes:{
    type:Number,
    default:0
  },
   totalDisLikes:{
    type:Number,
    default:0
  },
  likes:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
  dislikes:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],

});

// Create the Thread model from the schema
const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;