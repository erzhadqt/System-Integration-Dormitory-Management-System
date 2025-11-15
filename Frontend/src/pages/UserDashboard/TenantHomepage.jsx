import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bed, X } from 'lucide-react';
import {FaUser} from "react-icons/fa";

// Sample room data
const sampleRooms = [
  { id: 1, name: "Room 1", type: "single", status: "Full", imagePath: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800" },
  { id: 2, name: "Room 2", type: "double", status: "Available", imagePath: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800" },
  { id: 3, name: "Room 3", type: "bedspacers", status: "Full", imagePath: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800" },
  { id: 4, name: "Room 4", type: "single", status: "Available", imagePath: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800" },
  { id: 5, name: "Room 5", type: "double", status: "Available", imagePath: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
  { id: 6, name: "Room 6", type: "bedspacers", status: "Maintenance", imagePath: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800" },
];

const TenantHomepage = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Initialize rooms once on mount
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setRooms(sampleRooms);
      setLoading(false);
    }, 500);
  }, []);

  // Get unique room types
  const roomTypes = [...new Set(rooms.map((room) => room.type))];

  // Filter rooms based on search and type
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? room.type.toLowerCase() === selectedType.toLowerCase() : true;
    return matchesSearch && matchesType;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-100">
      
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-10 px-4 sm:px-6 lg:px-8 flex justify-between rounded-bl-3xl rounded-br-3xl">
        <div className="max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Find Your Perfect Room <br /> Here at <span className="text-zinc-800">GenTech Dormitory</span></h1>
          <p className="text-blue-100 text-lg">Browse through our collection of available spaces</p>
        </div>

        <div className="float-right">
            <button onClick={() => navigate('/dashboard')} className="bg-blue-700 hover:bg-blue-400 text-white text-md px-3 py-3 rounded-full font-semibold flex gap-2 ">
              <FaUser className="w-7 h-7 text-gray-800" />
              </button>
          </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by room name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Type Filter */}
            <div className="relative w-full lg:w-64">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Room Types</option>
                {roomTypes.map((rType, index) => (
                  <option key={index} value={rType}>
                    {rType.charAt(0).toUpperCase() + rType.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedType) && (
              <button
                onClick={clearFilters}
                className="w-full lg:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedType) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedType && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Type: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-blue-600 font-bold">{filteredRooms.length}</span> room{filteredRooms.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            {/* <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Clear All Filters
            </button> */}
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && filteredRooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={room.imagePath}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        room.status === 'Available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {room.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {room.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Bed className="mr-1 w-4 h-4" />
                        <span className="font-medium uppercase tracking-wide">
                          {room.type}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button onClick={() => navigate(`/room-detail/${id}`)} className="w-full mt-3 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform group-hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantHomepage;