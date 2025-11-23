import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import api from "../../api";

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for Profile Data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact_number: "",
    address: "",
    guardian_name: "",
    guardian_contact: "",
    room_number: "", // Read-only
    password: "", // Only for changing
  });

  // State for UI Feedback
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'

  // 1. Fetch Profile Data on Load
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("app/current-boarder/profile/");
      setFormData({
        ...res.data,
        password: "", // Don't fetch the hashed password
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      showAlert("Failed to load profile data", "error");
      setLoading(false);
    }
  };

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Save Changes to Backend
  const handleSave = async () => {
    try {
      const dataToSend = { ...formData };
      
      // Remove password if it's empty (so we don't overwrite it with blank)
      if (!dataToSend.password) delete dataToSend.password;

      await api.patch("app/current-boarder/profile/", dataToSend);
      
      showAlert("Profile updated successfully!", "success");
      setIsEditing(false);
      fetchProfile(); // Refresh data to be sure
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlert("Failed to update profile.", "error");
    }
  };

  // Helper for Alerts
  const showAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-6 flex items-center justify-center">
      
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row">
        
        {/* LEFT SIDE: Avatar & Basic Info */}
        <div className="md:w-1/3 bg-blue-600/20 p-8 flex flex-col items-center justify-center border-r border-white/10 relative">
          <Link to="/dashboard" className="absolute top-6 left-6 text-blue-200 hover:text-white transition-colors flex items-center gap-2">
             <FaArrowLeft /> Back
          </Link>

          <div className="relative mb-6 group">
            <div className="w-32 h-32 rounded-full bg-linear-to-tr from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl font-bold text-white">
                        {formData.username.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{formData.username}</h2>
          <p className="text-blue-200 text-sm mb-4">{formData.email}</p>
          
          <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20">
             <span className="text-sm font-semibold text-white">
                Room: {formData.room_number || "Unassigned"}
             </span>
          </div>
        </div>

        {/* RIGHT SIDE: Editable Details */}
        <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Profile Details</h1>
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                        isEditing 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30" 
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
                    }`}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
            </div>

            {alertMessage && (
                <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                    alertType === 'success' ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'
                }`}>
                    {alertMessage}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name / Username */}
                <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaUser className="w-4 h-4"/> Full Name
                    </label>
                    <input 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Email (Usually Read-Only recommended, but editable here) */}
                <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaEnvelope className="w-4 h-4"/> Email Address
                    </label>
                    <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaPhone className="w-4 h-4"/> Contact Number
                    </label>
                    <input 
                        name="contact_number"
                        value={formData.contact_number || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="0912 345 6789"
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaMapMarkerAlt className="w-4 h-4"/> Home Address
                    </label>
                    <input 
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="City, Province"
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                 {/* Guardian Name */}
                 <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaUsers className="w-4 h-4"/> Guardian Name
                    </label>
                    <input 
                        name="guardian_name"
                        value={formData.guardian_name || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                 {/* Guardian Contact */}
                 <div className="space-y-2">
                    <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                        <FaPhone className="w-4 h-4"/> Guardian Contact
                    </label>
                    <input 
                        name="guardian_contact"
                        value={formData.guardian_contact || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white outline-hidden transition-all ${
                            isEditing ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" : "border-white/10 opacity-70 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Password Change Field (Only visible when editing) */}
                {isEditing && (
                    <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-white/10">
                        <label className="text-yellow-200 text-sm font-medium flex items-center gap-2 mb-2">
                            Change Password (Optional)
                        </label>
                        <input 
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password to change"
                            className="w-full bg-slate-800/50 border border-yellow-500/30 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-hidden transition-all"
                        />
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;