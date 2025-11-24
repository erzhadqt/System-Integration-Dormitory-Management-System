import React, { useState, useEffect } from 'react';
import api from '../../api'; 
import { User, Home, Calendar, CheckCircle, AlertCircle, LogOutIcon, ArrowBigLeftDashIcon, HistoryIcon } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import LogoutAlertDialog from '../../components/LogoutAlertDialog';
import PayPalPayment from '../../pages/PayPal/PayPalPayment'; 

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // State
  const [boarderData, setBoarderData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Loading...");   
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [balanceAmount, setBalanceAmount] = useState(0);

  // NEW: State to control the Payment Modal
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // NEW: State for Cash Success Modal
  const [showCashSuccessModal, setShowCashSuccessModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("app/current-boarder/"); 
      const data = res.data;
      setBoarderData(data);
      setPaymentStatus(data.payment_status); 
      setBalanceAmount(data.due_amount);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setPaymentStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Function called when Payment is totally finished (Receipt closed)
  const handlePaymentComplete = () => {
      setIsPaymentOpen(false); // Close the modal
      fetchData(); // Refresh the dashboard data
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2 items-center text-white font-bold text-xl tracking-wider">
              <NavLink to="/tenant-homepage">
                <ArrowBigLeftDashIcon size={24} className="hover:text-gray-400 hover:scale-125"/>
              </NavLink>
                DORM<span className="text-blue-400">MATE</span>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/user-PaymentHistory')} className="flex gap-1 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all relative">
                    <HistoryIcon className="w-6 h-6" />
                    <span className="hidden sm:block">Payment History</span>
                </button>
                
                <LogoutAlertDialog onConfirm={logout}>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition-all">
                        <LogOutIcon className="w-5 h-5" />
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
               <NavLink to="/user-profile" className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2">
                 <User className="w-5 h-5" /> My Profile
               </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* CARD 1: Payment Status & PayPal Trigger */}
          <div className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-6 shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl shadow-lg ${
                  paymentStatus === 'Paid' ? 'bg-linear-to-br from-green-500 to-green-600' : 
                  paymentStatus === 'Pending' ? 'bg-linear-to-br from-yellow-500 to-yellow-600' :
                  'bg-linear-to-br from-red-500 to-red-600'
              }`}>
                {paymentStatus === 'Paid' ? <CheckCircle className="w-8 h-8 text-white" /> : <AlertCircle className="w-8 h-8 text-white" />}
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                  paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-200 border-green-400/30' : 
                  paymentStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30' :
                  'bg-red-500/20 text-red-200 border-red-400/30'
              }`}>
                STATUS
              </span>
            </div>
            <h2 className={`text-sm font-medium mb-1 uppercase tracking-wide ${
                paymentStatus === 'Paid' ? 'text-green-200' : 
                paymentStatus === 'Pending' ? 'text-yellow-200' :
                'text-red-200'
            }`}>
                Payment Status
            </h2>
            
            {/* Display Logic for Status Text */}
            {paymentStatus === "No Room" ? (
                 <p className="text-2xl font-bold text-gray-400 mb-2">No Room Assigned</p>
            ) : (
                <p className="text-4xl font-bold text-white mb-2">
                  {loading ? "..." : paymentStatus}
                </p>
            )}

            <div className="mt-4">
              
              {/* IF UNPAID: Show Payment Options */}
              {paymentStatus === 'Unpaid' && (
                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
                    Pay Now (₱{parseFloat(balanceAmount).toLocaleString()})
                  </DialogTrigger>
                  
                  <DialogContent className="bg-white sm:max-w-md p-6">
                    <DialogTitle>
                      <span className="text-xl font-bold text-gray-900 mb-4 text-center block">Select Payment Method</span>
                    </DialogTitle>
                    
                    {/* Toggle Buttons */}
                    <div className="flex gap-2 mb-6 justify-center">
                        <button 
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${paymentMethod === 'paypal' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            PayPal / Card
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('cash')}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${paymentMethod === 'cash' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Cash Payment
                        </button>
                    </div>

                    {/* CONDITION 1: PAYPAL */}
                    {paymentMethod === 'paypal' && (
                          <PayPalPayment 
                            amount={balanceAmount} 
                            onSuccess={handlePaymentComplete} // Pass the closer function
                          />
                    )}

                    {/* CONDITION 2: CASH */}
                    {paymentMethod === 'cash' && (
                        <div className="text-center space-y-4">
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-left">
                                <p className="text-sm text-yellow-800">
                                    <strong>Instructions:</strong><br/>
                                    1. Click the button below to notify the landlord.<br/>
                                    2. Visit the office and hand over the cash.<br/>
                                    3. Your status will update to <span className="text-green-600 font-bold">Paid</span> once verified.
                                </p>
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        await api.post('app/cash/request/', { amount: balanceAmount });
                                        setIsPaymentOpen(false); // Close the payment selector
                                        setShowCashSuccessModal(true); // Open success modal
                                        fetchData(); // Update background data
                                    } catch (err) {
                                        alert(err.response?.data?.error || "Error sending request");
                                    }
                                }}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all"
                            >
                                Confirm Cash Payment
                            </button>
                        </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}

              {/* IF PENDING */}
              {paymentStatus === 'Pending' && (
                <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-center">
                    <p className="text-yellow-200 font-bold text-sm">
                        ⏳ Payment Pending Verification
                    </p>
                </div>
              )}

              {/* IF PAID */}
              {paymentStatus === 'Paid' && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-center">
                    <p className="text-green-300 font-bold text-sm">
                        ✅ Rent Paid for this Month
                    </p>
                </div>
              )}
            </div>

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
            {boarderData?.room_number && (
                 <p className="text-blue-300 text-sm">
                    <span className="font-semibold">Price:</span> ₱{boarderData?.room_price || "0"} / month
                 </p>
            )}
          </div>

        </div>

        {/* NEW: Cash Payment Success Modal */}
        <Dialog open={showCashSuccessModal} onOpenChange={setShowCashSuccessModal}>
            <DialogContent className="bg-white sm:max-w-md p-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900 mb-2 text-center">
                    Request Sent Successfully!
                </DialogTitle>
                <p className="text-gray-600 mb-6 text-center">
                    The landlord has been notified. Please visit the office and make the cash payment to finalize your transaction.
                </p>
                <button
                    onClick={() => setShowCashSuccessModal(false)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                >
                    Understood
                </button>
            </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}

export default Dashboard;