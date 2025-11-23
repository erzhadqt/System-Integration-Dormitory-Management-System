import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import api from "../../api"; 

export default function PayPalPayment({ amount, onSuccess }) {
  
  // Function called when payment is successful
  const handleApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      
      console.log("Payment Completed by: " + details.payer.name.given_name);

      // Call your backend to save the record
      try {
        await api.post("/app/paypal/success/", {
          amount: amount,
          transaction_id: details.id, // The PayPal Transaction ID
        });
        
        alert("Payment Successful!");
        if (onSuccess) onSuccess(); // Close modal or refresh data
        
      } catch (error) {
        console.error("Backend error:", error);
        alert("Payment succeeded at PayPal but failed to save to database.");
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* "sb" stands for Sandbox (Test Mode). Replace with your Client ID later if needed */}
      <PayPalScriptProvider options={{ "client-id": "AfL0AIZGKmKPAMJ99RVoCz5dX6DebPHGPQafSGwzzAVuZPfueqQWl5hZRaE9OW0lgaR6uJb39Tw3PUVt", currency: "PHP" }}>
        
        <h3 className="text-center font-bold mb-4 text-lg">
            Pay Amount: ₱{amount}
        </h3>

        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(), // Amount must be a string
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