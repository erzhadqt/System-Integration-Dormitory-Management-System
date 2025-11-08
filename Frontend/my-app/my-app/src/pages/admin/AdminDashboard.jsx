import React, { useState } from "react";

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const tenants = [
    { name: "Juan Dela Cruz", room: "101", due: "₱2,000", joined: "Nov 5, 2025", status: "Pending" },
    { name: "Maria Santos", room: "202", due: "₱2,000", joined: "Nov 6, 2025", status: "Pending" },
    { name: "Pedro Reyes", room: "303", due: "₱2,500", joined: "Nov 7, 2025", status: "Pending" },
    { name: "Julia Ramos", room: "404", due: "₱3,000", joined: "Nov 8, 2025", status: "Pending" },
    { name: "Jerome Dizon", room: "505", due: "₱2,800", joined: "Nov 9, 2025", status: "Pending" },
  ];

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Dashboard</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tenant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-5 text-center hover:shadow-lg transition">
          <h3 className="text-sky-700 text-lg font-semibold">Total Tenants</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">{tenants.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 text-center hover:shadow-lg transition">
          <h3 className="text-sky-700 text-lg font-semibold">Total Rooms</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">15</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 text-center hover:shadow-lg transition">
          <h3 className="text-sky-700 text-lg font-semibold">Collected This Month</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">₱28,000</p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4">Pending Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-sky-50">
              <tr>
                <th className="text-left p-3 border-b">Tenant Name</th>
                <th className="text-left p-3 border-b">Room</th>
                <th className="text-left p-3 border-b">Amount Due</th>
                <th className="text-left p-3 border-b">Joined Date</th>
                <th className="text-left p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{tenant.name}</td>
                    <td className="p-3 border-b">{tenant.room}</td>
                    <td className="p-3 border-b">{tenant.due}</td>
                    <td className="p-3 border-b">{tenant.joined}</td>
                    <td className="p-3 border-b text-red-500">{tenant.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 border-b text-center text-gray-500">
                    No tenants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
