import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Login() {
  // const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login data:", formData);
  //   navigate("/dashboard"); // redirect after login
  // };

  return <Form route="app/token" method="login" />



    // <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg-picture7.jpg')" }}>
    //   <div className="absolute top-55 left-30 max-w-2xl p-2">
    //     <h1 className="text-5xl text-white font-extrabold">Welcome Back!</h1>
    //     <p className="text-white font-semibold">
    //       Manage your dormitory experience with ease. Log in to access your
    //       account, monitor payments, and stay connected with the dorm
    //       community.
    //     </p>
    //   </div>

    //   <div className="bg-white shadow-xl float-right min-h-screen p-8 max-w-3xl min-w-lg border border-blue-200">
    //     <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center mt-7">
    //       Log In
    //     </h2>

    //     <form className="space-y-4 p-5" onSubmit={handleSubmit}>
    //       <div className="flex flex-col gap-y-2">
    //         <label className="font-bold">Username</label>
    //         <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="font-semibold outline py-1 px-3 rounded" required/>
    //       </div>

    //       <div className="flex flex-col gap-y-2">
    //         <label className="font-bold">Password</label>
    //         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="font-semibold outline py-1 px-3 rounded" required/>
    //       </div>

    //       <button
    //         type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors mt-4">
    //         Log In
    //       </button>

    //       <p className="text-center text-sm text-gray-700 mt-4">
    //         Don’t have an account?{" "}
            
    //         <button onClick={() => navigate("/signup")} type="button" className="text-blue-700 font-medium hover:underline">
    //           Sign Up
    //         </button>
    //       </p>
    //     </form>
    //   </div>
    // </div>
}

export default Login;
