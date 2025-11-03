import React, { useState } from "react";

function AddTenants() {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
    contact: "",
  });
  const [tenants, setTenants] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTenant = {
      ...formData,
      joined: new Date().toLocaleDateString(),
      status: "Pending",
    };

    setTenants([...tenants, newTenant]);
    setFormData({ name: "", room: "", contact: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-sky-700">Tenants</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition">
          {showForm ? "Close Form" : "Add Tenant"}
        </button>
      </div>

      {showForm && (
        <div className="flex justify-center mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-sky-700 mb-4 text-center">
              Add Tenant
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded-lg" required/>
              <input type="text" name="room" value={formData.room} onChange={handleChange} placeholder="Room Number" className="w-full border p-2 rounded-lg" required />
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full border p-2 rounded-lg" required />
              <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition w-full">
                Save Tenant
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-sky-50">
            <tr>
              <th className="text-left p-3 border-b">Tenant Name</th>
              <th className="text-left p-3 border-b">Room</th>
              <th className="text-left p-3 border-b">Contact</th>
              <th className="text-left p-3 border-b">Joined Date</th>
              <th className="text-left p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.length > 0 ? (
              tenants.map((tenant, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{tenant.name}</td>
                  <td className="p-3 border-b">{tenant.room}</td>
                  <td className="p-3 border-b">{tenant.contact}</td>
                  <td className="p-3 border-b">{tenant.joined}</td>
                  <td className="p-3 border-b text-red-500">{tenant.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 border-b text-center text-gray-500">
                  No tenants added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddTenants;