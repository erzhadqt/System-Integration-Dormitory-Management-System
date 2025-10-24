import React from "react";

export default function Payment() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Payment</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg">
        <p className="text-gray-600 mb-2">Amount Due:</p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">₱3,200</h2>

        <div className="bg-blue-100 rounded-xl p-6 text-center mb-4">
          <p className="text-gray-600 mb-2">Scan to pay via GCash</p>
          <div className="w-40 h-40 bg-blue-200 mx-auto rounded-lg flex items-center justify-center">
            <span className="text-blue-600">[QR CODE]</span>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
