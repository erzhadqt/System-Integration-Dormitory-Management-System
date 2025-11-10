import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full items-center text-center px-10 py-6  text-black border-t">

        
    
        © {new Date().getFullYear()} Dormitory Management System. All rights reserved.
    </footer>
  );
};

export default Footer;
