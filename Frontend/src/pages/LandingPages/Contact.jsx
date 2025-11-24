import React from 'react';
import { Home, Info, Mail, ArrowRight, Building2, Facebook, Phone, Send, MapPin, Clock } from 'lucide-react';
import Header from '../../components/Header';

const Contact = () => {
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
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 font-semibold mb-6">
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Facebook Card */}
            <a
              href="https://web.facebook.com/erzhadqt/"
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-blue-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Facebook className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Facebook</h3>
                <p className="text-blue-200 font-semibold text-lg">GenTech</p>
                <span className="mt-4 text-sm text-blue-300 group-hover:text-blue-200 transition-colors">
                  Visit our page →
                </span>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:erzhadqt22@gmail.com"
              className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-red-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Email</h3>
                <p className="text-red-200 font-semibold text-lg break-all">gentech2025@gmail.com</p>
                <span className="mt-4 text-sm text-red-300 group-hover:text-red-200 transition-colors">
                  Send us a message →
                </span>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+639667106528"
              className="group backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-green-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Phone</h3>
                <p className="text-green-200 font-semibold text-lg">+63 966-710-6528</p>
                <span className="mt-4 text-sm text-green-300 group-hover:text-green-200 transition-colors">
                  Call us now →
                </span>
              </div>
            </a>
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            
            {/* Office Hours Card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl shrink-0">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-3">Office Hours</h3>
                  <div className="space-y-2 text-blue-200">
                    <p><span className="font-semibold text-white">Monday - Friday:</span> 8:00 AM - 6:00 PM</p>
                    <p><span className="font-semibold text-white">Saturday:</span> 9:00 AM - 4:00 PM</p>
                    <p><span className="font-semibold text-white">Sunday:</span> Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-500/20 rounded-xl shrink-0">
                  <MapPin className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-3">Our Location</h3>
                  <p className="text-blue-200 leading-relaxed">
                    123 Dormitory Street<br />
                    Zamboanga City<br />
                    Zamboanga Del Sur, Philippines
                  </p>
                  {/* <button className="mt-4 text-pink-300 hover:text-pink-200 font-semibold text-sm transition-colors flex items-center gap-1">
                    Get Directions →
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {/* <div className="mt-16 text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied dormitory residents and managers who trust our system
            </p>
            <button className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
              <Send className="w-5 h-5" />
              Send a Message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;