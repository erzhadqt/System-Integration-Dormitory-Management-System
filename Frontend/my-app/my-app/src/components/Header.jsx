import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-6 bg-black/30 backdrop-blur-sm text-white">
      <span className="text-2xl font-bold font-serif">Dormitory Management</span>

      <nav className="flex gap-8 text-semibold">
        <NavLink to="/" className={({ isActive }) => `text-lg font-semibold hover:underline transition-transform duration-300 hover:-translate-y-1 hover:text-blue-800 ${isActive ? 'underline text-blue-800' : ''}`}>
          Home
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => `text-lg font-semibold hover:underline transition-transform duration-300 hover:-translate-y-1 hover:text-blue-800 text-lg font-semibold ${isActive ? 'underline text-blue-800 ' : ''}`}>
          About
        </NavLink>


        <NavLink to="/contact" className={({ isActive }) => `text-lg font-semibold  hover:underline transition-transform duration-300 hover:-translate-y-1 hover:text-blue-800 ${isActive ? 'underline text-blue-800' : ''}`}>
          Contact
        </NavLink>
      </nav>

      <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold">
        Log In
      </button>
    </header>
  );
};

export default Header;
