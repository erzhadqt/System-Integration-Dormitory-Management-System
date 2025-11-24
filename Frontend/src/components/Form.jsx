import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import GoogleAuth from "../pages/GoogleAuth";

import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Signup";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (method === "login") {
        // 1. Perform Login
        const res = await api.post(route, { username, password });
        
        // 2. Save Tokens
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        // 3. CHECK USER ROLE (The New Part)
        // We make a quick call to get the user's details using the token we just saved
        const userRes = await api.get("app/user/"); 
        
        // 4. Redirect based on Role
        if (userRes.data.is_staff || userRes.data.is_superuser) {
            // If they are Staff/Admin -> Go to Admin Dashboard
            navigate("/admin-dashboard/addtenant"); // Change this to your actual Admin route
        } else {
            // If they are regular Tenant -> Go to Tenant Homepage
            navigate("/tenant-homepage");
        }

      } else if (method === "signup") {
        // ... existing signup logic ...
        const res = await api.post(route, { username, email, password });
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col md:flex-row"
      style={{ backgroundImage: "url('/bg-picture7.jpg')" }}
    >
      {/* LEFT SECTION */}
      <div className="relative md:absolute md:top-1/3 md:left-16 max-w-xl p-4 md:p-4 px-6 pt-20 md:pt-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold mb-4">Welcome!</h1>
        <p className="text-gray-200 font-semibold leading-relaxed text-base md:text-lg">
          Manage your dormitory experience with ease. Log in to access your
          account, monitor payments, and stay connected with the dorm community.
        </p>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="md:ml-auto bg-white shadow-2xl min-h-screen w-full md:max-w-lg p-6 sm:p-8 md:p-10 flex flex-col justify-center md:border-l border-blue-200 md:rounded-tl-3xl md:rounded-bl-3xl bg-linear-to-bl from-blue-50 to-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
          {name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-y-2">
            <label className="font-bold text-sm sm:text-base">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500 text-sm sm:text-base"
              required
            />
          </div>

          {method === "signup" && (
            <div className="flex flex-col gap-y-2">
              <label className="font-bold text-sm sm:text-base">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-y-2">
            <label className="font-bold text-sm sm:text-base">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500"
              required
            />
          </div>

          {method === "signup" && (
            <div className="flex flex-col gap-y-2">
              <label className="font-bold text-sm sm:text-base">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500"
                required
              />
            </div>
          )}

          {loading && <LoadingIndicator />}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            // onClick={() => navigate("/tenant-homepage")}
          >
            {name}
          </button>

          {method === "login" ? (
            <p className="text-center text-xs sm:text-sm text-gray-700">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                type="button"
                className="text-blue-700 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-center text-xs sm:text-sm text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="text-blue-700 font-medium hover:underline"
              >
                Log In
              </button>
            </p>
          )}

          <hr className="m-3 sm:m-5 border-sm border-gray-400"/>

		  <p className="text-center text-sm sm:text-base text-zinc-600">
			Or Signup with Google
		  </p>

          <div className="flex justify-center">
            
            <GoogleAuth />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
