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
        <Route path="/tenant-homepage" element={<TenantHomepage /> } />
        <Route path="/tenant-homepage/:id" element={<RoomDetail /> } />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        

        {/* Admin pages */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rooms" element={<RoomManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="addtenant" element={<AddTenant />} />
          <Route path="sendreminder" element={<SendReminder />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;