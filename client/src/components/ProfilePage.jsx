import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostsCard';
import CreatePost from './CreatePost';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/user/details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { userId } = response.data;
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated (token exists in localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      // If not authenticated, navigate the user to the login page
      navigate('/');
    } else {
      const fetchUserId = async () => {
        const userId = await getUserDetails(token);
        getUserPosts(token, userId);
      };
      fetchUserId();
    }
  }, [navigate]);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:3000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getUserPosts = async (token, userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const likePost = (id) => {
    const token = localStorage.getItem('token');
    axios
      .post(`http://localhost:3000/post/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === id) {
            return { ...post, likes: response.data };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addComment = (id, commentText) => {
    const token = localStorage.getItem('token');
    axios
      .post(
        `http://localhost:3000/post/${id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === id) {
            return { ...post, comments: [...post.comments, response.data] };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Profile Page</h1>

      <CreatePost onPostCreated={createPost} />

      <div className="mt-4">
        <h2>Your Posts</h2>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            deletePost={deletePost}
            likePost={likePost}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
