import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Home, Info, Mail, ArrowRight, Building2, Shield, Users, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate()

  return (

    <>
          <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden py-6 sm:py-10">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <Header />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="mt-16 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-in">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Modern Dorm Management Solution</span>
            <span className="xs:hidden">Dorm Management</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl leading-tight animate-slide-up">
            Welcome to
            <span className="block mt-1 sm:mt-2 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dormitory Management
            </span>
            <span className="block mt-1 sm:mt-2">System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-blue-200 mb-8 sm:mb-12 max-w-3xl mx-auto drop-shadow-lg leading-relaxed animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
            Manage your dorm with ease and efficiency. Streamline operations, enhance communication, and create a better living experience.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up px-4" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => navigate('/signup')}
              className="cursor-pointer w-full sm:w-auto group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
            >
              Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
            </button>

            <button onClick={() => navigate('/about')} className="cursor-pointer w-full sm:w-auto group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20 animate-slide-up px-4" style={{ animationDelay: '0.6s' }}>
            
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Secure & Reliable</h3>
              <p className="text-blue-200 text-xs sm:text-sm">Your data is protected with enterprise-grade security</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Easy Collaboration</h3>
              <p className="text-purple-200 text-xs sm:text-sm">Connect residents and staff effortlessly</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
              <div className="p-2 sm:p-3 bg-pink-500/20 rounded-xl w-fit mx-auto mb-3 sm:mb-4">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Fast & Efficient</h3>
              <p className="text-pink-200 text-xs sm:text-sm">Streamline operations and save valuable time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>

  );
};

export default LandingPage;
