import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import api from "../../api";
import { CheckCircle, Receipt, Calendar, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button, or use standard html button

export default function PayPalPayment({ amount, onSuccess }) {
  // State to store transaction details after success
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [cashRequest, setCashRequest] = useState(null);
  const [error, setError] = useState(null);

  const handleApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      console.log("Payment Completed by: " + details.payer.name.given_name);

      try {
        await api.post("/app/paypal/success/", {
          amount: amount,
          transaction_id: details.id,
        });

        // INSTEAD OF ALERT, SET SUCCESS STATE
        setPaymentSuccess({
          transactionId: details.id,
          payerName: details.payer.name.given_name + " " + details.payer.name.surname,
          date: new Date().toLocaleString(),
          amount: amount,
          status: "COMPLETED"
        });

      } catch (error) {
        console.error("Backend error:", error);
        setError("Payment processed by PayPal but failed to save in our system. Please contact admin.");
      }

      // try {
      //   await api.post("/app/cash/request/");


      // }
    });
  };

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  // --- VIEW 1: SUCCESS RECEIPT ---
  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-500 text-sm">Thank you for your payment.</p>

        {/* Receipt Card */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 mt-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-500 text-sm flex items-center gap-2"><Receipt size={14}/> Transaction ID</span>
            <span className="font-mono text-xs font-bold text-gray-700">{paymentSuccess.transactionId}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-500 text-sm flex items-center gap-2"><User size={14}/> Payer</span>
            <span className="font-medium text-gray-700">{paymentSuccess.payerName}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
             <span className="text-gray-500 text-sm flex items-center gap-2"><Calendar size={14}/> Date</span>
             <span className="font-medium text-gray-700 text-sm">{paymentSuccess.date}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
             <span className="text-gray-800 font-bold text-sm">Amount Paid</span>
             <span className="font-bold text-xl text-green-600">₱{parseFloat(paymentSuccess.amount).toLocaleString()}</span>
          </div>
        </div>

        <button 
          onClick={onSuccess} 
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all mt-4"
        >
          Done
        </button>
      </div>
    );
  }

  // --- VIEW 2: PAYPAL BUTTONS ---
  return (
    <div className="w-full max-w-md mx-auto p-1">
      <PayPalScriptProvider options={{ "client-id": clientId, currency: "PHP" }}>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex justify-between items-center">
            <span className="text-blue-800 font-medium text-sm">Total Due</span>
            <span className="text-blue-900 font-bold text-xl">₱{parseFloat(amount).toLocaleString()}</span>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                {error}
            </div>
        )}

        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", borderRadius: 8 }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}