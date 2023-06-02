import React, { useState } from 'react';

const PostCard = ({ post, likePost, addComment, deletePost }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    addComment(post._id, commentText);
    setCommentText('');
  };

  const handleDelete = () => {
    deletePost(post._id);
  };

  return (
    <div key={post._id} className="border border-gray-300 p-4 my-4 rounded-md">
      <p>{post.content}</p>
      <p>
        Likes: <span id={`likesCount-${post._id}`}>{post.likes.length}</span>
      </p>
      <button onClick={() => likePost(post._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Like
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
        Delete
      </button>

      <h3>Comments</h3>
      <div id={`commentsContainer-${post._id}`} className="mt-2">
        {Array.isArray(post.comments) && post.comments.map(comment => (
          <p key={comment._id}>{comment.text}</p>
        ))}
      </div>

      <div className="mt-2">
        <input
          type="text"
          value={commentText}
          onChange={handleCommentTextChange}
          placeholder="Enter your comment"
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
