import React, { useState, useEffect } from 'react';
import api from '../../api';
import { User, CreditCard, History, Home, Calendar, DollarSign, CheckCircle, LogOutIcon, BellIcon } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa';

import { NavLink, Link } from "react-router-dom"

function Dashboard() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  // If Google Login was used, this will exist in localStorage
  const googleName = localStorage.getItem("given_name");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("app/user/");

        // Store username from backend (for normal login)
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Decide which name to display
  const displayName = googleName ? googleName : username;


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center pb-3">
          <Link to="/tenant-homepage" className='flex text-white gap-2 pb-5 items-center'>
          <FaArrowLeft size={24} className='text-white'/> Back
        </Link>

        <Link to="/logout" className="flex w-15 items-center gap-2 bg-linear-to-r from-red-600 to-red-500 hover:from-red-600 hover:to-red-700 text-black px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <LogOutIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
        </div>
        
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Title Section */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Welcome Back, <span className="text-zinc-200">{loading ? "..." : (displayName || "User")}!</span>
                </h1>
                <p className="text-blue-200 text-lg">Manage your rental account and payments</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                  <NavLink to="/profile" className="group flex items-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Edit Profile
                  </NavLink>

                  <NavLink to="/payment" className="group flex items-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Make Payment
                  </NavLink>

                  <NavLink to="/PaymentHistory" className="group flex items-center gap-2 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Payment History
                  </NavLink>

                  <NavLink to="/notifications" className="group flex items-center gap-2 bg-linear-to-r from-gray-200 to-white hover:from-gray-200 hover:to-gray-300 text-black px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <BellIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </NavLink>

                  {/* <NavLink to="/logout" className="group flex items-center gap-2 bg-linear-to-r from-red-600 to-red-500 hover:from-red-600 hover:to-red-700 text-black px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      <LogOutIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </NavLink> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Current Balance Card */}
          <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full border border-blue-400/30">
                BALANCE
              </span>
            </div>
            
            <h2 className="text-sm font-medium text-blue-200 mb-1 uppercase tracking-wide">
              Current Balance
            </h2>
            <p className="text-4xl font-bold text-white mb-2">₱3,200</p>
            <p className="text-blue-300 text-sm">
              <span className="text-yellow-400 font-semibold">⚠ Payment due soon</span>
            </p>
          </div>

          {/* Next Due Date Card */}
          <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs font-bold rounded-full border border-purple-400/30">
                DUE DATE
              </span>
            </div>
            
            <h2 className="text-sm font-medium text-purple-200 mb-1 uppercase tracking-wide">
              Next Due Date
            </h2>
            <p className="text-4xl font-bold text-white mb-2">Oct 30</p>
            <p className="text-purple-300 text-sm">
              <span className="font-semibold">2025</span> · 19 days remaining
            </p>
          </div>

          {/* Room Status Card */}
          <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-200 text-xs font-bold rounded-full border border-green-400/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                ACTIVE
              </span>
            </div>
            
            <h2 className="text-sm font-medium text-green-200 mb-1 uppercase tracking-wide">
              Your Room
            </h2>
            <p className="text-4xl font-bold text-white mb-2">A102</p>
            <p className="text-green-300 text-sm">
              <span className="font-semibold">Status:</span> Occupied · Floor 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;