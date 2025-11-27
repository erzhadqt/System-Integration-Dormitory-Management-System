import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../../api"; // your axios instance

function Payment() {
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalCollected, setTotalCollected] = useState(0);

  const [payments, setPayments] = useState([]);
  const [boarders, setBoarders] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [chartData, setChartData] = useState([]);

  // -----------------------------
  // FETCH DATA FROM BACKEND
  // -----------------------------
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [pRes, bRes, rRes] = await Promise.all([
        api.get("/app/payment/"),
        api.get("/app/boarders/"),
        api.get("/app/rooms/"),
      ]);

      setPayments(pRes.data);
      setBoarders(bRes.data);
      setRooms(rRes.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const handleApprovePayment = async (paymentId) => {
    try {
        await api.patch(`/app/payment/${paymentId}/`, {
            status: 'Completed'
        });
        alert("Payment Approved!");
        fetchAllData(); // Refresh table
    } catch (err) {
        console.error("Error approving payment:", err);
        alert("Failed to approve payment");
    }
  };

  // ---------------------------------
  // MERGE PAYMENT + BOARDER + ROOM
  // ---------------------------------
  const mergedPayments = payments.map((p) => {
    const boarder = boarders.find((b) => b.id === p.boarder);
    const room = rooms.find((r) => r.id === boarder?.room);

    return {
      ...p,
      tenantName: boarder
        ? `${boarder.username}`
        : "Unknown",
      roomNumber: room?.room_number || "-",
      roomType: room?.room_type || "-",
      rent: Number(room?.price || p.amount), // fallback
      dueDate: room?.due_date || p.date_paid,
    };
  });

  // -----------------------------
  // CHART LOGIC
  // -----------------------------
  const getChartDataByFilter = () => {
    const paid = mergedPayments.filter((p) => p.status === "Completed");
    const selected = selectedDate ? new Date(selectedDate) : new Date();

    // DAILY
    if (selectedFilter === "Daily") {
      const data = Array.from({ length: 24 }, (_, h) => ({ name: `${h}:00`, amount: 0 }));
      paid.forEach((p) => {
        const d = new Date(p.date_paid);
        if (d.toDateString() === selected.toDateString()) {
          data[d.getHours()].amount += p.rent;
        }
      });
      return data;
    }

    // WEEKLY
    if (selectedFilter === "Weekly") {
      const start = new Date(selected);
      start.setDate(start.getDate() - start.getDay() + 1);

      const data = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return {
          name: d.toLocaleDateString("en-US", { weekday: "short" }),
          date: d,
          amount: 0,
        };
      });

      paid.forEach((p) => {
        const d = new Date(p.date_paid);
        data.forEach((x) => {
          if (x.date.toDateString() === d.toDateString()) x.amount += p.rent;
        });
      });

      return data;
    }

    // MONTHLY
    if (selectedFilter === "Monthly") {
      const y = selected.getFullYear();
      const m = selected.getMonth();
      const days = new Date(y, m + 1, 0).getDate();

      const data = Array.from({ length: days }, (_, i) => ({
        name: `${i + 1}`,
        amount: 0,
      }));

      paid.forEach((p) => {
        const d = new Date(p.date_paid);
        if (d.getMonth() === m && d.getFullYear() === y) {
          data[d.getDate() - 1].amount += p.rent;
        }
      });

      return data;
    }

    // YEARLY
    if (selectedFilter === "Yearly") {
      const y = selected.getFullYear();
      const data = Array.from({ length: 12 }, (_, i) => ({
        name: new Date(y, i).toLocaleString("en-US", { month: "short" }),
        amount: 0,
      }));

      paid.forEach((p) => {
        const d = new Date(p.date_paid);
        if (d.getFullYear() === y) data[d.getMonth()].amount += p.rent;
      });

      return data;
    }
  };

  // Update chart when fields change
  useEffect(() => {
    const newData = getChartDataByFilter();
    setChartData(newData);
    setTotalCollected(newData.reduce((s, x) => s + x.amount, 0));
  }, [payments, rooms, boarders, selectedDate, selectedFilter]);

  // -----------------------------
  // SAVE PAYMENT CHANGES TO BACKEND
  // -----------------------------
  const handleSave = async (index, updated) => {
    try {
      await api.patch(`/app/payment/${updated.id}/`, {
        status: updated.status,
        payment_method: updated.payment_method,
      });

      const updatedPayments = [...payments];
      updatedPayments[index] = updated;

      setPayments(updatedPayments);
      setEditingIndex(null);
    } catch (err) {
      console.error("Failed to update payment:", err);
    }
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-4 md:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 text-center">
        Payment Management
      </h1>

      {/* SUMMARY + CHART */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-10">
        {/* TOTAL */}
        <div className="bg-white w-full lg:w-1/3 p-4 sm:p-6 rounded-xl shadow border flex flex-col justify-center items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Total Collected</h2>
          <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2 sm:mt-3">
            ₱{totalCollected.toLocaleString()}
          </p>
        </div>

        {/* CHART */}
        <div className="bg-white w-full lg:w-2/3 p-4 sm:p-6 rounded-xl shadow border">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
            Payment Overview ({selectedFilter})
          </h2>
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="cursor-pointer border rounded-lg p-2 w-full sm:w-auto text-sm sm:text-base"
        />

        <div className="flex flex-wrap gap-2 justify-center">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                selectedFilter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Tenant</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Room</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Type</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Amount (₱)</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Date Paid</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Due Date</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Status</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Method</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {mergedPayments.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-blue-50">
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{p.tenantName}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{p.roomNumber}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{p.roomType}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{p.rent.toLocaleString()}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{new Date(p.date_paid).toLocaleDateString()}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">{p.dueDate}</td>

                {/* Status */}
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
                      p.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      p.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                      {p.status}
                  </span>
                </td>

                {/* Method */}
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
                      p.payment_method === 'PayPal' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                      {p.payment_method}
                  </span>
                </td>

                {/* Action */}
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  {p.status === 'Pending' && (
                    <button
                      onClick={() => handleApprovePayment(p.id)}
                      className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm shadow whitespace-nowrap"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payment;