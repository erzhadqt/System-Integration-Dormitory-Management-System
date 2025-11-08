import React from "react";
import { Link } from "react-router-dom";
import RoomList from "./RoomList";

function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Tenant Dashboard</h1>

        <div className="flex gap-4">
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            View Profile
          </Link>

          <Link
            to="/payment"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Make Payment
          </Link>

          <Link
            to="/paymenthistory"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            View Payment History
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400">
          <h2 className="text-sm text-gray-500">Current Balance</h2>
          <p className="text-2xl font-semibold text-blue-600">₱3,200</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400">
          <h2 className="text-sm text-gray-500">Next Due Date</h2>
          <p className="text-2xl font-semibold text-blue-600">Oct 30, 2025</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
          <h2 className="text-sm text-gray-500 mb-2">Room Status</h2>
          <p className="text-lg font-semibold text-blue-700">Room A102</p>
          <p className="text-sm font-medium mt-1 text-green-600">Occupied</p>
        </div>
      </div>

      {/* Render RoomList */}
      <RoomList />
    </div>
  );
}

export default Dashboard;
