import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // function Logout() {
  //   localStorage.clear()
  //   return <Navigate to="/" />
  // }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Tenants", path: "/admin/addtenant" },
    { name: "Rooms", path: "/admin/rooms" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Send Reminder", path: "/admin/sendreminder" },
    { name: "CMS", path: "/admin/cms" },
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
          <button onClick={() => navigate("/logout")} className="w-full bg-white text-sky-700 rounded-lg py-2 font-semibold hover:bg-gray-200 transition">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;
