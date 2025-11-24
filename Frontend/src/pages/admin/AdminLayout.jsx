import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import LogoutAlertDialog from "../../components/LogoutAlertDialog";
import { useAuth } from '../../context/AuthContext';

import { Menu, X } from 'lucide-react';

function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    // { name: "Dashboard", path: "/admin-dashboard/rooms" },
    { name: "Tenants", path: "/admin-dashboard/addtenant" },
    { name: "Rooms", path: "/admin-dashboard/rooms" },
    { name: "Payments", path: "/admin-dashboard/payments" },
    // { name: "Send Reminder", path: "/admin-dashboard/sendreminder" },
    // { name: "CMS", path: "/admin-dashboard/cms" },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-sky-700 text-white rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <aside className={`fixed md:relative md:w-64 w-64 bg-sky-700 text-white flex flex-col p-6 h-screen md:h-auto transform transition-transform duration-300 ease-in-out z-40 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Dormitory Admin</h1>
        <nav className="flex flex-col gap-3 sm:gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`p-2 rounded hover:bg-sky-600 transition text-sm sm:text-base ${
                location.pathname === item.path ? "bg-sky-600 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-4 sm:mt-6">
          <LogoutAlertDialog onConfirm={logout}>
            <button className="w-full bg-white text-sky-700 rounded-lg py-2 font-semibold hover:bg-gray-200 transition">
              Logout
            </button>
          </LogoutAlertDialog>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-white/80 bg-opacity-10 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;
