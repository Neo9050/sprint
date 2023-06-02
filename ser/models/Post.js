import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    id: { 
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
