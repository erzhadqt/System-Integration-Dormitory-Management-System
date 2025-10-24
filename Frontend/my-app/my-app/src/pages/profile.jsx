import React from "react";

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Profile</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg">
        <p><span className="font-semibold">Name:</span> Han Balimbingan</p>
        <p><span className="font-semibold">Email:</span> han@example.com</p>
        <p><span className="font-semibold">Contact:</span> 09xx xxx xxxx</p>
        <p><span className="font-semibold">Room No.:</span> 203</p>
        <p><span className="font-semibold">Move-in Date:</span> April 2025</p>
      </div>
    </div>
  );
}
