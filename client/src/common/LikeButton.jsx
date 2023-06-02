import React from 'react';

const LikeButton = ({ postId, handleLike, likesCount }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md mr-2"
      onClick={() => handleLike(postId)}
    >
      Like ({likesCount})
    </button>
  );
};

export default LikeButton;
