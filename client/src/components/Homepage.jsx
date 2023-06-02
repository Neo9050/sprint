import React, { useState, useEffect } from 'react';
import AxiosInstance from './AxiosInstance';
import PostCard from './PostsCard';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const createPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const likePost = (id) => {
    AxiosInstance
      .post(`/post/${id}/like`)
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

  const addComment = (id, comments) => {
    AxiosInstance
      .post(`/post/${id}/comments`, { text: comments})
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

  const getAllPosts = () => {
    AxiosInstance
      .get('/post/')
      .then((response) => {
        const serverData = response.data;
        setPosts(serverData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      getAllPosts();
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Homepage</h1>

      <CreatePost onPostCreated={createPost} />

      <div className="mt-4">
        <h2>All Posts</h2>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            likePost={likePost}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PostCard from './PostsCard';
// import CreatePost from './CreatePost';

// const Homepage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   const createPost = (newPost) => {
//     setPosts([newPost, ...posts]);
//   };

//   const likePost = (id) => {
//     axios
//       .post(`http://localhost:3000/post/${id}/like`)
//       .then((response) => {
//         const updatedPosts = posts.map((post) => {
//           if (post._id === id) {
//             return { ...post, likes: response.data };
//           }
//           return post;
//         });
//         setPosts(updatedPosts);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const addComment = (id, commentText) => {
//     axios
//       .post(`http://localhost:3000/post/${id}/comment`, { text: commentText })
//       .then((response) => {
//         const updatedPosts = posts.map((post) => {
//           if (post._id === id) {
//             return { ...post, comments: [...post.comments, response.data] };
//           }
//           return post;
//         });
//         setPosts(updatedPosts);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const getAllPosts = () => {
//     axios
//       .get('http://localhost:3000/post/')
//       .then((response) => {
//         const serverData = response.data;
//         setPosts(serverData);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Welcome to the Homepage</h1>

//       <CreatePost onPostCreated={createPost} />

//       <div className="mt-4">
//         <h2>All Posts</h2>
//         {posts.map((post) => (
//           <PostCard
//             key={post._id}
//             post={post}
//             likePost={likePost}
//             addComment={addComment}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;
