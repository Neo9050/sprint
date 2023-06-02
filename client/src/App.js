import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import ProfilePage from './components/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './components/userProfile';



const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer/>
     <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;




















