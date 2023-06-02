import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  userImage: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
