import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Payment from "./pages/payment";
import Login from "./auth/login";
import Signup from "./auth/signup";
import ForgotPassword from "./auth/ForgotPassword";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}