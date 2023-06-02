import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/login'); // Redirect to login page after logout
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prevIsProfileOpen) => !prevIsProfileOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileOpen(false);
  };

  const handleMyProfileClick = () => {
    navigate('/profilePage');
  };

  return (
    <nav className="bg-gray-800 py-4 px-8">
      <div className="container mx-auto flex items-center justify-between" onMouseLeave={closeProfileDropdown}>
        <div className="flex items-center">
          <img src="onestep_icon.png" alt="Onestep Logo" className="h-8 w-8 mr-2" />
          <div className="bg-white rounded-md p-1">
            <input
              type="text"
              placeholder="Search"
              className="text-gray-800 px-2 py-1 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-white mr-4" onClick={handleMyProfileClick}>
           Profile
          </button>
          <div className="relative">
            <button className="text-white" onClick={toggleProfileDropdown}>
              {isProfileOpen ? 'Close Profile' : 'My Profile'}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-2">
                  <img
                    src="user.png"
                    alt="User Profile"
                    className="h-8 w-8 rounded-full mx-auto mb-2"
                  />
                  <p className="text-center">User Profile</p>
                </div>
                <hr className="my-2" />
                <button
                  className="text-red-500 text-sm block w-full text-left px-4 py-2 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
