import React, { useState } from "react";

function RoomManagement() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    rent: "",
  });
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = { ...formData };
    setRooms([...rooms, newRoom]);
    setFormData({ roomNumber: "", type: "", capacity: "", rent: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-sky-700">Rooms</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          {showForm ? "Close Form" : "Add Room"}
        </button>
      </div>

      {showForm && (
        <div className="flex justify-center mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
            <button
              className="absolute top-2 right-3 text-gray-500 font-bold text-xl"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-sky-700 mb-4 text-center">
              Add Room
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Room Number"
                className="w-full border p-2 rounded-lg"
                required
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              >
                <option value="">Select Room Type</option>
                <option value="Bedspacer">Bedspacer</option>
                <option value="Solo">Solo</option>
              </select>

              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full border p-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Monthly Rent (₱)"
                className="w-full border p-2 rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition w-full"
              >
                Save Room
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-sky-50">
            <tr>
              <th className="text-left p-3 border-b">Room Number</th>
              <th className="text-left p-3 border-b">Type</th>
              <th className="text-left p-3 border-b">Capacity</th>
              <th className="text-left p-3 border-b">Rent (₱)</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{room.roomNumber}</td>
                  <td className="p-3 border-b">{room.type}</td>
                  <td className="p-3 border-b">{room.capacity}</td>
                  <td className="p-3 border-b">{room.rent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 border-b text-center text-gray-500">
                  No rooms added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomManagement;
