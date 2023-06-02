import React from 'react';

const Post = ({ post, children }) => {
  return (
    <div key={post._id} className="border border-gray-300 rounded p-4 mb-4">
      {post.image && <img src={post.image} alt="Post" className="mb-2" />}
      <p>{post.content}</p>
      <div className="flex items-center mt-2">
        {children}
      </div>
    </div>
  );
};

export default Post;
