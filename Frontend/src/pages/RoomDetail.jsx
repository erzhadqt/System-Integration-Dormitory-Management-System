import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RoomDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state;

  const handleClose = () => navigate("/dashboard");

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg animate-fadeIn z-10">

        <button onClick={handleClose} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">
          ✕
        </button>

        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Room {room.roomNumber} Details
        </h1>

        <div className="text-center">
          <p className="text-gray-700 mb-2">
            <strong>Type:</strong> {room.type}
          </p>

          <p
            className={`mb-2 font-medium ${
              room.status === "Occupied" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            <strong>Status:</strong> {room.status}
          </p>

          {room.status === "Occupied" && (
            <p className="text-gray-700 mb-2">
              <strong>Occupant:</strong> {room.occupant}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;