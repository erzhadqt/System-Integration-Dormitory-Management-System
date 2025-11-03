import React from 'react';
import Header from '../auth/Header';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg-picture1.jpg')" }}>
      <Header />

      <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-black">
          Welcome to Dormitory Management System
        </h1>
        <p className="text-xl drop-shadow-md text-gray-800">
          Manage your dorm with ease and efficiency.
        </p>

        <button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 w-40 rounded-lg font-semibold mt-5 transition-transform duration-300 hover:-translate-y-1">Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
