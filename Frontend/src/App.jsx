import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

import Dashboard from "./pages/UserDashboard/dashboard";
import Profile from "./pages/UserDashboard/profile";
import Payment from "./pages/UserDashboard/payment";
import PaymentHistory from "./pages/UserDashboard/PaymentHistory";
import TenantHomepage from "./pages/UserDashboard/TenantHomepage";
import RoomDetail from "./pages/RoomDetail";

import Login from "./auth/login";
import Signup from "./auth/signup";
import ForgotPassword from "./auth/ForgotPassword";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RoomManagement from "./pages/admin/RoomManagement";
import SendReminder from "./pages/admin/SendReminder";
import PaymentManagement from "./pages/admin/PaymentManagement";
import AddTenant from "./pages/admin/AddTenants";
import LandingPage from "./pages/LandingPages/LandingPage";
import About from "./pages/LandingPages/About";
import Contact from "./pages/LandingPages/Contact";

import NotFound from "./pages/NotFound";

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Signup />
}

function App() {
  return (
    <div className="min-h-screen text-gray-800">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegisterAndLogout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* Tenants pages */}
        <Route path="/tenant-homepage" element={<ProtectedRoute><TenantHomepage /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user-payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/user-PaymentHistory" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
        

        {/* Admin pages */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin-dashboard/addtenant" element={<AddTenant />} />
          <Route path="/admin-dashboard/payments" element={<PaymentManagement />} />
          <Route path="/admin-dashboard/rooms" element={<RoomManagement />} />
          <Route path="/admin-dashboard/sendreminder" element={<SendReminder />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;