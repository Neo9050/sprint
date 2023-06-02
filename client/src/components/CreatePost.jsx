import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  const createPost = () => {
    if (content.trim() === '') {
      setError('Post content cannot be empty');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('content', content);

    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:3000/post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newPost = response.data;
        onPostCreated(newPost);
        setContent('');
        setImage(null);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while creating the post');
      });
  };

  return (
    <div className="mt-4">
      <h2>Create Post</h2>
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Enter your post"
        className="border border-gray-300 px-4 py-2 rounded-md"
      />
      <input type="file" onChange={handleImageUpload} className="mt-2" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
        Post
      </button>
    </div>
  );
};

export default CreatePost;
