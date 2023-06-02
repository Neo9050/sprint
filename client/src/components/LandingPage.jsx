import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <ToastContainer/>
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <img src="/onestep_icon.png" alt="Onestep Logo" className="w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Onestep</h1>
      <p className="text-lg text-gray-600 mb-8">Connect and share with friends in one step!</p>
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md shadow-md" onClick={handleRegisterClick}>Register</button>
        <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-md shadow-md" onClick={handleLoginClick}>Login</button>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
