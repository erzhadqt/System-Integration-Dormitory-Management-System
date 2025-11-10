import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-300 via-blue-400 to-blue-500">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Send Reset Link
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full text-blue-700 font-medium hover:underline mt-2"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
