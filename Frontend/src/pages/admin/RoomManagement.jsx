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
    <div className="p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700">Tenants</h1>

        <AddBoarderDialog onSaved={onOperationSuccess}>
          <button className="flex gap-2 items-center text-sm sm:text-base bg-sky-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-sky-700 transition">
            <PlusSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            Tenant
          </button>
        </AddBoarderDialog>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showSuccess ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        {showSuccess && <SuccessAlert />}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg -mx-3 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="bg-sky-50 sticky top-0">
            <tr>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Room No.</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Tenant Name</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Gender</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Address</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Email</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Contact</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Guardian Name</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Guardian No.</th>
              <th className="p-2 sm:p-3 md:p-4 text-center text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenants.length ? (
              tenants.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-zinc-700 whitespace-nowrap">{t.room_number}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-sm sm:text-base text-zinc-700 font-bold whitespace-nowrap">{t.username}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-zinc-700 whitespace-nowrap">{t.gender}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-zinc-700 whitespace-nowrap">{t.address}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-sm sm:text-base text-zinc-700 font-semibold whitespace-nowrap">{t.email}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-sm sm:text-base text-zinc-700 font-semibold whitespace-nowrap">{t.contact_number}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-zinc-700 font-semibold whitespace-nowrap">{t.guardian_name}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-zinc-700 font-semibold whitespace-nowrap">{t.guardian_contact}</td>
                  <td className="p-2 sm:p-3 md:p-4">
                    <div className="flex gap-1 sm:gap-2 justify-center items-center">
                      <EditBoarderDialog boarder={t} onSaved={onOperationSuccess}>
                        <button className="text-green-600 hover:underline p-1">
                          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </EditBoarderDialog>

                      <DeleteConfirmDialog onConfirm={() => deleteTenant(t.id)}>
                        <button className="text-red-600 hover:underline text-xs sm:text-sm p-1 whitespace-nowrap">
                          Delete
                        </button>
                      </DeleteConfirmDialog>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
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