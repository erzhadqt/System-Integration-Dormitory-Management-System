import React from 'react'
import Header from '../../components/Header'
import { FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";


const Contact = () => {
  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg-picture1.jpg')" }}>
        <Header />

        <div className="z-20 flex items-center justify-center h-full px-6 text-center text-2xl font-bold">
            <FaFacebook size={40} className="text-blue-600 hover:text-blue-800 cursor-pointer m-5" />GenTech
            <FaEnvelope  size={40} className="text-red-500 hover:text-red-700 cursor-pointer m-5" />gentech2025@gmail.com
            <FaPhone size={40} className="text-green-500 hover:text-green-700 cursor-pointer m-5" />+63 966-710-6528

        </div>
    </div>
  )
}

export default Contact