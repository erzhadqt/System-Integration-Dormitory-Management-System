import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Signup data:", formData);
    navigate("/login");
  };

  return (
    <div className="h-screen bg-cover bg-center relative " style={{ backgroundImage: "url('/bg-picture7.jpg')" }}>
      <div className="absolute top-55 left-30 max-w-2xl p-2">
        <h1 className=" text-5xl text-white font-extrabold">Create Your Account</h1>
        <p className="text-white font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis ipsum quasi impedit dolor, vitae molestias asperiores unde corporis maxime excepturi eius modi obcaecati voluptas harum inventore fuga. Accusantium, aspernatur.</p>
      </div>
      
      

      <div className="bg-white shadow-xl float-right min-h-screen p-8 max-w-3xl min-w-lg border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center mt-7">
          Sign Up
        </h2>

        <form className="space-y-4 p-5">
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="font-semibold outline py-1 px-3" />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="font-semibold outline py-1 px-3"/>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="font-semibold outline py-1 px-3"/>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="font-semibold outline py-1 px-3"/>
          </div>

          <button onClick={handleSubmit} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors mt-4">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-blue-700 font-medium hover:underline">
              Log In
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;
