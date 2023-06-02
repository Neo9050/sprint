import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
      });
      // Registration successful
    toast.success('Registration successful',
    {position: toast.POSITION.TOP_RIGHT, autoClose: 9000});
    // Navigate user to the login page
    navigate('/login');
  } catch (error) {
    // Registration failed
    if (error.response && error.response.status === 400) {
      toast.error('Email already registered', 
      {position: toast.POSITION.TOP_RIGHT, autoClose: 9000});
      // Navigate user to the login page
      navigate('/login');
    } else {
      toast.error('An error occurred',  
      {position: toast.POSITION.TOP_RIGHT, autoClose: 8000});
      // Navigate user to the landingpage
      navigate('/');
    }
  }
};

  return (
    <>
     <ToastContainer  position="top-right"
        autoClose={8000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     <div className="w-96 bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-4 text-center">Join Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-between">
           <button
             type="submit"
             className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Register
           </button>
          <button
           onClick={() => navigate('/')}
           className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 ml-4"
           >
             Home
           </button>
         </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default RegistrationForm;
