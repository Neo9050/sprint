import React from 'react';

const DeletePostButton = ({ postId, handleDelete }) => {
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md ml-auto"
      onClick={() => handleDelete(postId)}
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
