import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const Navigations = () => {
    const navigate = useNavigate()

  return (
    <header className="px-10 py-6 flex items-center justify-between">
        <span className="text-3xl font-bold font-serif">
            GenTech Dormitory
        </span>

        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-800 text-white text-lg px-3 py-2 rounded-lg font-semibold flex gap-2">
            <FaUser className="w-6 h-6 text-gray-800 dark:text-gray-200" /> Profile
        </button>
    </header>
  )
}

export default Navigations