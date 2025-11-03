import React from 'react';
import Header from '../auth/Header';

const About = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: "url('/bg-picture1.jpg')" }}
    >
        <Header />

      <div className="z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-5xl text-black font-bold mb-6 drop-shadow-lg">
          About Our Dormitory Management System
        </h1>
        <p className="max-w-3xl text-lg text-gray-800 font-semibold leading-relaxed drop-shadow-md">
          Our Dormitory Management System is designed to simplify the daily operations of dormitories.
          It allows administrators to efficiently manage student records, room allocations, and payments.
          With integrated online payment options and real-time notifications, managing dorm activities
          has never been easier.
        </p>

        <p className="max-w-3xl text-lg text-gray-800 font-semibold mt-4 leading-relaxed drop-shadow-md">
          Whether you are a student, dorm manager, or admin, our system helps streamline communication,
          enhance transparency, and ensure a comfortable living experience for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
