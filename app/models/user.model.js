import mongoose from 'mongoose';

// User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password should be at least 8 characters long']
  },
  profilePicture: {
    type: String
  },
  mobile: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'guest', 'creator', 'admin', 'superAdmin'],
    default: 'user'
  },
  active: {type:Boolean, default:true}
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

export default User;