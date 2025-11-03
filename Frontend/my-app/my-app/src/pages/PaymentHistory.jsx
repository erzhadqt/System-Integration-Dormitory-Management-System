import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="p-6">
     
      <Link to="/dashboard" className="self-start mb-4 text-blue-700 font-semibold hover:underline flex items-center">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Payment History
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payment records found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="text-center border-b hover:bg-gray-50">
                  <td className="p-3 border">₱{payment.amount}</td>
                  <td className="p-3 border">{payment.date}</td>
                  <td className={`p-3 border font-semibold ${payment.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
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