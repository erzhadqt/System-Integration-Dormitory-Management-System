import React, { useState, useEffect } from "react";
import api from "../../api";

import { PlusSquare, Edit } from "lucide-react";

import AddBoarderDialog from "../../components/AddBoarderDialog";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import EditBoarderDialog from "../../components/EditBoarderDialog";
import SuccessAlert from "../../components/SuccessAlert";

function AddTenants() {
  const [tenants, setTenants] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await api.get("app/boarders/");
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants:", err);
    }
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    // Hide the alert automatically after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const onOperationSuccess = () => {
    fetchTenants();
    handleSuccess();
  };

  const deleteTenant = async (id) => {
    try {
      await api.delete(`app/boarders/${id}/`);
      // Use the wrapper here directly
      onOperationSuccess();
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-sky-700">Tenants</h1>

        <AddBoarderDialog onSaved={onOperationSuccess}>
          <button className="flex gap-2 items-center text-md bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition">
            <PlusSquare size={20} />
            Tenant
          </button>
        </AddBoarderDialog>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showSuccess ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        {showSuccess && <SuccessAlert />}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-sky-50 sticky top-0">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Room No.</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Tenant Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Address</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Guardian Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Guardian No.</th>
              <th className="p-4 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenants.length ? (
              tenants.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-zinc-700">{t.room_number}</td>
                  <td className="p-4 text-md text-zinc-700 font-bold">{t.username}</td>
                  <td className="p-4 text-sm text-zinc-700">{t.gender}</td>
                  <td className="p-4 text-sm text-zinc-700">{t.address}</td>
                  <td className="p-4 text-md text-zinc-700 font-semibold">{t.email}</td>
                  <td className="p-4 text-md text-zinc-700 font-semibold">{t.contact_number}</td>
                  <td className="p-4 text-sm text-zinc-700 font-semibold">{t.guardian_name}</td>
                  <td className="p-4 text-sm text-zinc-700 font-semibold">{t.guardian_contact}</td>
                  <td className="p-4 flex mt-2 gap-2">
                    <EditBoarderDialog boarder={t} onSaved={onOperationSuccess}>
                      <button className="text-green-600 hover:underline"><Edit /></button>
                    </EditBoarderDialog>

                    <DeleteConfirmDialog onConfirm={() => deleteTenant(t.id)}>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </DeleteConfirmDialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-3 text-center text-gray-500 text-sm">
                  No tenants found.
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
