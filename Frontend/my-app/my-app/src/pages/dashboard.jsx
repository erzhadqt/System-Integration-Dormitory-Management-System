import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Tenant Dashboard</h1>

        {/* Quick Links */}
        <div className="flex gap-4">
          <a
            href="/profile"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            View Profile
          </a>
          <a
            href="/payment"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Make Payment
          </a>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400">
          <h2 className="text-sm text-gray-500">Current Balance</h2>
          <p className="text-2xl font-semibold text-blue-600">₱3,200</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400">
          <h2 className="text-sm text-gray-500">Next Due Date</h2>
          <p className="text-2xl font-semibold text-blue-600">Oct 30, 2025</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400">
          <h2 className="text-sm text-gray-500">Room Status</h2>
          <p className="text-2xl font-semibold text-green-600">Occupied</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
