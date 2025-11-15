import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full backdrop-blur-md bg-white/5 bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 border-t border-white/10 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dormitory Management
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Simplifying dormitory operations with modern technology and seamless management solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-sky-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-pink-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-200 hover:text-blue-300 text-sm transition-colors duration-300 hover:translate-x-1 inline-block">
                  → Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-blue-200 hover:text-blue-300 text-sm transition-colors duration-300 hover:translate-x-1 inline-block">
                  → About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-200 hover:text-blue-300 text-sm transition-colors duration-300 hover:translate-x-1 inline-block">
                  → Contact
                </a>
              </li>
              <li>
                <a href="/login" className="text-blue-200 hover:text-blue-300 text-sm transition-colors duration-300 hover:translate-x-1 inline-block">
                  → Login
                </a>
              </li>
            </ul>
          </div> */}

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li className="text-blue-200 text-sm">→ Room Management</li>
              <li className="text-blue-200 text-sm">→ Payment Processing</li>
              <li className="text-blue-200 text-sm">→ Tenant Portal</li>
              <li className="text-blue-200 text-sm">→ Admin Dashboard</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <a href="mailto:gentech2025@gmail.com" className="hover:text-blue-300 transition-colors">
                  gentech2025@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <a href="tel:+639667106528" className="hover:text-blue-300 transition-colors">
                  +63 966-710-6528
                </a>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>Cagayan de Oro City, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-blue-200 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Dormitory Management System. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-blue-200 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" /> by GenTech
            </p>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-blue-200 hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
              <span className="text-blue-300">•</span>
              <a href="#" className="text-blue-200 hover:text-blue-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;