import React, { useState, useEffect } from "react";
import api from "../../api";
import { FiTrash2 } from "react-icons/fi";
import { Edit as EditIcon, PlusSquare } from 'lucide-react' // Note: EditIcon is usually exported as Edit

import EditRoomDialog from "../../components/EditRoomDialog";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import SuccessAlert from '../../components/SuccessAlert';
import AddRoomDialog from "../../components/AddRoomDialog";

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [tenants, setTenants] = useState([])

    // Fetch Rooms
    const fetchRooms = () => {
        api.get("/app/rooms/")
            .then((res) => setRooms(res.data))
            .catch((err) => console.error("Error fetching rooms:", err));
    };

    // Initial Load
    useEffect(() => {
        fetchRooms();
        const fetchTenants = async () => {
            try {
                const response = await api.get('app/boarders/')
                setTenants(response.data)
            } catch (err) {
                console.error("Error fetching tenants", err);
            }
        }
        fetchTenants()
    }, []);

    const handleDeleteRoom = (id) => {
        api.delete(`app/rooms/${id}/`)
            .then(() => {
                setRooms(rooms.filter((room) => room.id !== id));
                handleShowSuccess(); 
            })
            .catch((err) => console.error("Error deleting room:", err));
    };

    const handleEditClick = (room) => {
        setSelectedRoom(room);
        setShowEditDialog(true);
    };

    const handleShowSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    //  Helper to handle when a room is successfully edited
    const onEditSuccess = () => {
        fetchRooms();      // 1. Reload data
        handleShowSuccess(); // 2. Show green alert
        setShowEditDialog(false); // 3. Close dialog
    };

    return (
        <div className="min-h-auto bg-linear-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto p-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Room Management</h2>
                        </div>
                        <AddRoomDialog
                            onSaved={() => {
                                fetchRooms();
                                handleShowSuccess();
                            }}
                        >
                            <button className="flex items-center gap-2 bg-blue-700 text-white px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
                                <PlusSquare size={22} />
                                Room
                            </button>
                        </AddRoomDialog>
                    </div>
                </div>
                 <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showSuccess ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                    {showSuccess && <SuccessAlert />}
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Room Number</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Boarders</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {rooms.length > 0 ? (
                                    rooms.map((room) => {
                                        const roomBoarders = tenants.filter((t) => t.room_number === room.room_number);
                                        return (
                                            <tr key={room.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.room_number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₱ {room.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{room.room_type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{room.due_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                                        room.status === "Available"
                                                            ? "bg-green-50 text-green-700 border border-green-200"
                                                            : "bg-red-50 text-red-700 border border-red-200"
                                                    }`}>
                                                        {room.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {roomBoarders.length > 0 ? (
                                                        <ul className="list-disc pl-5">
                                                            {roomBoarders.map((b) => (
                                                                <li key={b.id} className="text-sm text-gray-600">{b.username}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">No boarders</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleEditClick(room)}
                                                            className="p-2 text-green-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                            title="Edit room"
                                                        >
                                                            <EditIcon size={22} />
                                                        </button>
                                                        <DeleteConfirmDialog
                                                            onConfirm={() => handleDeleteRoom(room.id)}
                                                            title="Delete Room"
                                                            description="Are you sure? This cannot be undone."
                                                        >
                                                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                                                                <FiTrash2 size={18} />
                                                            </button>
                                                        </DeleteConfirmDialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-gray-500 font-medium">No rooms added yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        </div>
            </div>
            
            {/* EDIT DIALOG */}
            {showEditDialog && selectedRoom && (
                <EditRoomDialog
                    room={selectedRoom}
                    onClose={() => setShowEditDialog(false)}
                    onSaved={onEditSuccess} // Use the new handler here
                />
                )}
                </div>
    );
    }
    export default RoomManagement;