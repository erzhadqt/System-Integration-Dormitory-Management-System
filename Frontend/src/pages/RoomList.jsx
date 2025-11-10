import React from "react";
import { useNavigate } from "react-router-dom";

function RoomList() {
  const navigate = useNavigate();

  // Example room data
  const rooms = [
    { roomNumber: "101", type: "Solo", status: "Occupied", occupant: "Maria Santos", notes: "Next available Dec 1" },
    { roomNumber: "256", type: "Bedspacer", status: "Occupied", occupant: "Juan Dela Cruz", notes: "Available next month" },
    { roomNumber: "163", type: "Solo", status: "Available", occupant: null, notes: "Available now" },
    { roomNumber: "837", type: "Bedspacer", status: "Occupied", occupant: "Luis Reyes", notes: "Available in 3 days" },
  ];

  const handleRoomClick = (room) => {
    navigate("/roomdetail", { state: room });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">Other Rooms</h2>
      <hr className="border-gray-300 mb-4" />

      <div className="flex flex-wrap gap-3"> {/* Use flex-wrap for side by side layout */}
        {rooms.map((room, index) => (
          <div
            key={index}
            onClick={() => handleRoomClick(room)}
            className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-blue-400 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 h-48 w-60 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-1">
                Room {room.roomNumber} ({room.type})
              </h3>
              <p
                className={`text-sm font-medium ${
                  room.status === "Occupied" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {room.status}
              </p>
            </div>
            {room.notes && (
              <p className="text-xs text-gray-500 mt-2">{room.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
