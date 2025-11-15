import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    contact: "",
    image: null,
    roomNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("signupData"));
    if (savedProfile) {
      setProfile({
        fullName: savedProfile.fullName || "",
        email: savedProfile.email || "",
        contact: savedProfile.contact || "",
        image: savedProfile.image || null,
        roomNumber: savedProfile.roomNumber || "",
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...profile, image: reader.result };
        setProfile(updatedProfile);
        localStorage.setItem("signupData", JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("signupData", JSON.stringify(profile));
    setIsEditing(false);
    setAlertMessage("Profile updated successfully!");
    setAlertType("success");
  };

  const handlePasswordSave = () => {
    const savedData = JSON.parse(localStorage.getItem("signupData"));
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertMessage("New password and confirm password do not match.");
      setAlertType("error");
      return;
    }
    if (passwordData.currentPassword !== savedData.password) {
      setAlertMessage("Current password is incorrect.");
      setAlertType("error");
      return;
    }

    savedData.password = passwordData.newPassword;
    localStorage.setItem("signupData", JSON.stringify(savedData));
    setAlertMessage("Password changed successfully!");
    setAlertType("success");

    setShowPasswordForm(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-6 relative">
      
      {alertMessage && (
        <div className={`absolute top-6 px-6 py-3 rounded-xl shadow-lg text-white text-center transition-all duration-500 ${alertType === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {alertMessage}
        </div>
      )}

      <Link to="/dashboard" className="flex text-white gap-2 pb-5 items-center self-start mb-4 font-semibold hover:underline">
        <FaArrowLeft size={24} className='text-white'/> Back
      </Link>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Profile
      </h1>

      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 max-w-md w-full text-center border border-white/20 shadow-2xl">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img src={profile.image || "https://via.placeholder.com/150?text=Profile+Picture"} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 hover:opacity-80 transition"/>
          </label>

          <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
        </div>

        <div className="space-y-3 text-left">
          <div>
            <label className="font-semibold text-white">Full Name:</label>
            {isEditing ? (
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="block w-full border rounded-lg px-3 py-1 mt-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>
            ) : (
              <p>{profile.fullName}</p>
            )}
          </div>

          <div>
            <label className="font-semibold text-white">Email:</label>
            {isEditing ? (
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="block w-full border rounded-lg px-3 py-1 mt-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>
            ) : (
              <p>{profile.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold text-white">Contact:</label>
            {isEditing ? (
              <input type="text" name="contact" value={profile.contact} onChange={handleChange} className="block w-full border rounded-lg px-3 py-1 mt-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>
            ) : (
              <p>{profile.contact}</p>
            )}
          </div>

          <div>
            <label className="font-semibold text-white">Room Number:</label>
            <p className="text-gray-400">
              {profile.roomNumber || "Not assigned yet"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all">
              Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
              Edit Profile
            </button>
          )}

          <button
            onClick={() => {setShowPasswordForm(!showPasswordForm); setPasswordData({currentPassword: "", newPassword: "", confirmPassword: "",});}} className={`px-4 py-2 rounded-lg transition-all text-white ${showPasswordForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}>
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-6 text-left">
            <h2 className="font-semibold text-white text-lg mb-3">
              Change Password
            </h2>
            <div className="space-y-3">
              <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} placeholder="Current Password" className="block w-full border rounded-lg px-3 py-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>

              <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="New Password" className="block w-full border rounded-lg px-3 py-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>

              <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange}placeholder="Confirm New Password" className="block w-full border rounded-lg px-3 py-1 border-blue-300 focus:ring-2 focus:ring-blue-400"/>

              <button onClick={handlePasswordSave} className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full transition-all">
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;