import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import PropTypes from 'prop-types';

// Separate component for User Profile Details
const UserProfileDetails = ({ username }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="user-photo.jpg"
        alt="User Profile"
        className="h-40 w-40 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{username}</h2>
    </div>
  );
};

UserProfileDetails.propTypes = {
  username: PropTypes.string.isRequired,
};

// Separate component for Username Update Section
const UsernameUpdateSection = ({ username, onUsernameChange, onUpdateUsername }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border rounded px-2 py-1 mr-2"
        value={username}
        onChange={onUsernameChange}
      />
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={onUpdateUsername}
      >
        Update
      </button>
    </div>
  );
};

UsernameUpdateSection.propTypes = {
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onUpdateUsername: PropTypes.func.isRequired,
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the user profile data on component mount
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Make an API request to fetch the user profile data
      const response = await AxiosInstance.get('/user/profile');

      // Extract the username from the response data
      const { username } = response.data;

      // Set the username state
      setUsername(username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleHomepageClick = () => {
    navigate('/homepage');
  };

  const handleProfilePageClick = () => {
    navigate('/profile');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateUsername = async () => {
    try {
      // Make an API request to update the username
      await AxiosInstance.put('/user/username/:username', { username });

      // Show a success message or perform any other necessary action
      console.log('Username updated successfully');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <UserProfileDetails username={username} />
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600"
            onClick={handleHomepageClick}
          >
            Homepage
          </button>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            onClick={handleProfilePageClick}
          >
            Profile Page
          </button>
        </div>
        <UsernameUpdateSection
          username={username}
          onUsernameChange={handleUsernameChange}
          onUpdateUsername={handleUpdateUsername}
        />
      </div>
    </div>
  );
};

export default UserProfile;
