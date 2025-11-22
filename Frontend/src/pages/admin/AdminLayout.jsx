import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import LogoutAlertDialog from "../../components/LogoutAlertDialog";
import { useAuth } from '../../context/AuthContext';

function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // function Logout() {
  //   localStorage.clear()
  //   return <Navigate to="/" />
  // }

  const menuItems = [
    // { name: "Dashboard", path: "/admin-dashboard/rooms" },
    { name: "Tenants", path: "/admin-dashboard/addtenant" },
    { name: "Rooms", path: "/admin-dashboard/rooms" },
    { name: "Payments", path: "/admin-dashboard/payments" },
    { name: "Send Reminder", path: "/admin-dashboard/sendreminder" },
    { name: "CMS", path: "/admin-dashboard/cms" },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      <aside className="w-64 bg-sky-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">Dormitory Admin</h1>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`p-2 rounded hover:bg-sky-600 transition ${
                location.pathname === item.path ? "bg-sky-600 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <LogoutAlertDialog onConfirm={logout}>
            <button className="w-full bg-white text-sky-700 rounded-lg py-2 font-semibold hover:bg-gray-200 transition">
              Logout
            </button>
          </LogoutAlertDialog>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;
