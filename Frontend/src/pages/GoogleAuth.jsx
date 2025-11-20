import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Make sure you're importing your axios instance

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Optional: You can decode the token just to inspect user info
      const decoded = jwtDecode(googleToken);
      console.log("Google decoded token:", decoded);

      

      // Send Google token to Django for verification & JWT creation
      const res = await api.post("/app/google-auth", {
        token: googleToken,
      });

      console.log("Backend login response:", res.data);

      // Save JWT tokens returned by your Django backend
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("given_name", res.data.given_name);

      navigate("/tenant-homepage");
    } catch (error) {
      console.error("Google Authentication Failed:", error);
      alert("Authentication failed. Try again.");
    }
  };

  // const handleLogout = () => {
  //   googleLogout();
  //   localStorage.clear();
  //   navigate("/");
  // };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => alert("Google Login Failed")}
      auto_select={false}
      theme="outline"
      shape="pill"
      size="large"
      text="signin_with"
      width="280"
    />
  );
};

export default GoogleAuth;
