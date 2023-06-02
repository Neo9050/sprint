import React, { useState } from 'react';

const CreatePostForm = ({ handlePostSubmit }) => {
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (image) {
      base64Image = await convertImageToBase64(image);
    }

    handlePostSubmit({ content: newPost, image: base64Image });
    setNewPost('');
    setImage(null);
  };

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="border border-gray-300 rounded p-2 w-full mb-2"
        placeholder="Write a post..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="mb-2"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
        type="submit"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
