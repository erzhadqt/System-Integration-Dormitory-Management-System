import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, CreditCard, Bell, CheckCircle, Shield, Clock, Zap, Info, ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden py-10">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <Header />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 font-semibold mb-6">
              <Info className="w-4 h-4" />
              <span>About Our Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
              About Our
              <span className="block mt-2 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dormitory Management
              </span>
              <span className="block mt-2">System</span>
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-blue-100 leading-relaxed drop-shadow-lg">
                Our Dormitory Management System is designed to <span className="font-bold text-white">simplify the daily operations</span> of dormitories.
                It allows administrators to efficiently manage student records, room allocations, and payments.
                With integrated online payment options and real-time notifications, managing dorm activities
                has never been easier.
              </p>

              <p className="text-xl text-blue-100 leading-relaxed drop-shadow-lg">
                Whether you are a <span className="font-bold text-white">student, dorm manager, or admin</span>, our system helps streamline communication,
                enhance transparency, and ensure a comfortable living experience for everyone.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Feature 1 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Student Management</h3>
              <p className="text-blue-200 text-sm">Efficiently manage student records and profiles in one place</p>
            </div>

            {/* Feature 2 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                <Building2 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Room Allocation</h3>
              <p className="text-purple-200 text-sm">Smart room assignment and availability tracking system</p>
            </div>

            {/* Feature 3 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-4">
                <CreditCard className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Online Payments</h3>
              <p className="text-pink-200 text-sm">Integrated payment gateway for seamless transactions</p>
            </div>

            {/* Feature 4 */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
                <Bell className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Real-time Notifications</h3>
              <p className="text-green-200 text-sm">Stay updated with instant alerts and announcements</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              Why Choose Our System?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/20 rounded-lg shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Streamlined Communication</h3>
                  <p className="text-blue-200 text-sm">Connect students, managers, and admins effortlessly through our integrated messaging system</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Enhanced Transparency</h3>
                  <p className="text-blue-200 text-sm">Track all activities and transactions with complete visibility and accountability</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg shrink-0">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Time-Saving Automation</h3>
                  <p className="text-blue-200 text-sm">Automate repetitive tasks and focus on what matters most</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-pink-500/20 rounded-lg shrink-0">
                  <Zap className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Comfortable Living</h3>
                  <p className="text-blue-200 text-sm">Create a better living experience with efficient management and quick support</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Transform Your Dorm Management?
            </h2>
            <button onClick={() => navigate('/signup')} className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style> */}
    </div>
  );
};

export default About;
