import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import api from "../../api";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // Call the new endpoint we just created
      const res = await api.get("app/current-boarder/history/");
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
     
      <Link to="/user-dashboard" className="flex text-white gap-2 items-center self-start mb-4 font-semibold hover:underline w-fit">
        <FaArrowLeft size={24} className='text-white'/> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-blue-200 mb-6 text-center">
        Payment History
      </h1>

      <div className="border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto">
        {loading ? (
           <p className="text-center text-gray-300">Loading records...</p>
        ) : payments.length === 0 ? (
          <div className="text-center py-8">
             <p className="text-gray-300 text-lg">No payment records found.</p>
             <p className="text-gray-500 text-sm">Payments you make will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-blue-200 border-b border-white/20">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    
                    {/* Date Column */}
                    <td className="p-3 text-gray-300">
                        {formatDate(payment.date_paid)}
                    </td>

                    {/* Method Column (Cash/PayPal) */}
                    <td className="p-3 text-gray-300 font-medium">
                        {payment.payment_method}
                    </td>

                    {/* Amount Column */}
                    <td className="p-3 text-white font-bold">
                        ₱{parseFloat(payment.amount).toLocaleString()}
                    </td>

                    {/* Status Column */}
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        payment.status === "Completed" ? "bg-green-500/20 text-green-300 border border-green-500/30" : 
                        payment.status === "Pending" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" : 
                        "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;