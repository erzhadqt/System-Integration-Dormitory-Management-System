import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);

    useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("paymentHistory")) || [];

    const sortedPayments = storedPayments.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setPayments(sortedPayments);
  }, []);

  return (
    <div className="h-screen p-6 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
     
      <Link to="/dashboard" className="flex text-white gap-2 items-center self-start mb-4 font-semibold hover:underline">
                    <FaArrowLeft size={24} className='text-white'/> Back
                  </Link>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Payment History
      </h1>

      <div className="border border-white/20 shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto">
        {payments.length === 0 ? (
          <p className="text-center text-white">No payment records found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="shadow-2xl text-white">
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="p-3 border text-white">₱{payment.amount}</td>
                  <td className="p-3 border text-white">{payment.date}</td>
                  <td className={`p-3 border text-white font-semibold ${payment.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;