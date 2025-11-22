import React, { useState, useEffect } from 'react';
import api from '../../api'; 
import { User, Home, Calendar, CheckCircle, AlertCircle, LogOutIcon, BellIcon, ArrowBigLeftDashIcon } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

import LogoutAlertDialog from '../../components/LogoutAlertDialog';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // State
  const [boarderData, setBoarderData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Loading..."); // 'Paid' or 'Unpaid'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	const fetchData = async () => {
	  try {
		// 1. Fetch Boarder Info
		const boarderRes = await api.get("app/current-boarder/me/");
		setBoarderData(boarderRes.data);

		// 2. Fetch Payments to Check Status
		const paymentRes = await api.get("app/current-boarder/payments/");	
		const pendingPayments = paymentRes.data.filter(p => p.status === 'Pending');
		const totalBalance = pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
		
		// Determine Status
		if (totalBalance > 0) {
		  setPaymentStatus("Unpaid");
		} else {
		  setPaymentStatus("Paid");
		}

	  } catch (error) {
		console.error("Error fetching dashboard data:", error);
		setPaymentStatus("Unknown");
	  } finally {
		setLoading(false);
	  }
	};

	fetchData();
  }, []);

  // Helper to format dates
  const formatDate = (dateString) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
	<div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
	  
	  {/* Background Elements (Optional decorative blobs) */}
	  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
	  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

	  <div className="relative z-10 p-4 sm:p-6 lg:p-8">
		
		{/* HEADER: Notification & Logout Buttons */}
		<div className="flex justify-between items-center mb-8">
			{/* Logo or Title */}
			<div className="flex gap-2 items-center text-white font-bold text-xl tracking-wider">
			  <NavLink to="/tenant-homepage">
				<ArrowBigLeftDashIcon size={24} className="hover:text-gray-400 hover:scale-125"/>
			  </NavLink>
				DORM<span className="text-blue-400">MATE</span>
			</div>

			{/* Action Buttons */}
			<div className="flex items-center gap-4">
				<button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all relative">
					<BellIcon className="w-6 h-6" />
					{/* Notification Dot (Optional logic could go here) */}
					<span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
				</button>
				
				<LogoutAlertDialog onConfirm={logout}>
					<button 
					className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition-all"
					>
						<LogOutIcon className="w-5 h-5" />
						<span className="hidden sm:inline">Logout</span>
					</button>
				</LogoutAlertDialog>
			</div>
		</div>
		
		{/* Welcome Section */}
		<div className="mb-8">
		  <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
			<h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
			  Welcome Back, <span className="text-zinc-200">
				{loading ? "..." : (boarderData?.username || boarderData?.email || "User")}!
			  </span>
			</h1>
			<p className="text-blue-200 text-lg">Here is your account overview.</p>
			
			<div className="flex flex-wrap gap-4 mt-6">
			   <NavLink to="/profile" className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2">
				 <User className="w-5 h-5" /> My Profile
			   </NavLink>
			   {/* Add other NavLinks here if needed */}
			</div>
		  </div>
		</div>

		{/* Stats Cards Grid */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
		  
		  {/* CARD 1: Payment Status (Replaces Current Balance) */}
		  <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl transition-all">
			<div className="flex items-start justify-between mb-4">
			  <div className={`p-3 rounded-2xl shadow-lg ${paymentStatus === 'Paid' ? 'bg-linear-to-br from-green-500 to-green-600' : 'bg-linear-to-br from-red-500 to-red-600'}`}>
				{paymentStatus === 'Paid' ? <CheckCircle className="w-8 h-8 text-white" /> : <AlertCircle className="w-8 h-8 text-white" />}
			  </div>
			  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-200 border-green-400/30' : 'bg-red-500/20 text-red-200 border-red-400/30'}`}>
				STATUS
			  </span>
			</div>
			<h2 className={`text-sm font-medium mb-1 uppercase tracking-wide ${paymentStatus === 'Paid' ? 'text-green-200' : 'text-red-200'}`}>
				Payment Status
			</h2>
			<p className="text-4xl font-bold text-white mb-2">
			  {loading ? "..." : paymentStatus}
			</p>
			<p className="text-blue-300 text-sm">
			  {paymentStatus === 'Paid' ? "You are all caught up!" : "Please settle your dues."}
			</p>
		  </div>

		  {/* CARD 2: Next Due Date */}
		  <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl transition-all">
			<div className="flex items-start justify-between mb-4">
			  <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
				<Calendar className="w-8 h-8 text-white" />
			  </div>
			  <span className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs font-bold rounded-full border border-purple-400/30">
				DUE DATE
			  </span>
			</div>
			<h2 className="text-sm font-medium text-purple-200 mb-1 uppercase tracking-wide">Next Due Date</h2>
			<p className="text-4xl font-bold text-white mb-2">
			  {loading ? "..." : formatDate(boarderData?.due_date)}
			</p>
		  </div>

		  {/* CARD 3: Room Status */}
		  <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl transition-all">
			<div className="flex items-start justify-between mb-4">
			  <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
				<Home className="w-8 h-8 text-white" />
			  </div>
			  <span className="px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full border border-blue-400/30 flex items-center gap-1">
				<CheckCircle className="w-3 h-3" />
				ACTIVE
			  </span>
			</div>
			<h2 className="text-sm font-medium text-blue-200 mb-1 uppercase tracking-wide">Your Room</h2>
			<p className="text-4xl font-bold text-white mb-2">
			  {loading ? "..." : (boarderData?.room_number || "No Room")}
			</p>
			<p className="text-blue-300 text-sm">
			  <span className="font-semibold">Price:</span> ₱{boarderData?.room_price || "0"} / month
			</p>
		  </div>

		</div>
	  </div>
	</div>
  );
}

export default Dashboard;