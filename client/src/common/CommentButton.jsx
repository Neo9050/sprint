import React from 'react';

const CommentButton = ({ postId, handleComment }) => {
  return (
    <button
      className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded-md mr-2"
      onClick={() => handleComment(postId, 'A comment')}
    >
      Comment
    </button>
  );
};

export default CommentButton;
