import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    const newPayment = {
      amount: 3200,
      date: new Date().toLocaleString(),
      status: "Pending", 
      reviewedBy: null,
    };

    const existingPayments =
      JSON.parse(localStorage.getItem("paymentHistory")) || [];

    existingPayments.push(newPayment);

    localStorage.setItem("paymentHistory", JSON.stringify(existingPayments));

    navigate("/paymentHistory");
  };

  return (
    <div className="p-6">
      <Link to="/dashboard" className="self-start mb-4 text-blue-700 font-semibold hover:underline flex items-center">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Payment
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 max-w-2xl mx-auto">
        <p className="text-gray-600 mb-2">Amount Due:</p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">₱3,200</h2>

        <div className="bg-blue-100 rounded-xl p-5 text-center mb-5">
          <p className="text-gray-600 mb-3">Scan to pay via GCash</p>

          <div className="w-[90%] mx-auto h-[360px] flex items-center justify-center rounded-xl bg-white shadow-inner">
            <img src="/image/qr.jpg" alt="GCash QR Code" className="w-[95%] h-[95%] object-contain cursor-pointer hover:scale-105 transition" onClick={() => alert("Open your GCash app and scan this QR to complete payment.")}
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mb-4">
          Open your GCash app → Tap “Pay QR” → Scan this code.
        </p>

        <button onClick={handleConfirmPayment} className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

export default Payment;