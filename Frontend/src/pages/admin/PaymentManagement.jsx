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

  // ---------------------------------
  // MERGE PAYMENT + BOARDER + ROOM
  // ---------------------------------
  const mergedPayments = payments.map((p) => {
    const boarder = boarders.find((b) => b.id === p.boarder);
    const room = rooms.find((r) => r.id === boarder?.room);

    return {
      ...p,
      tenantName: boarder
        ? `${boarder.first_name} ${boarder.last_name}`
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
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Payment Management
      </h1>

      {/* SUMMARY + CHART */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* TOTAL */}
        <div className="bg-white w-full md:w-1/3 p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold">Total Collected</h2>
          <p className="text-4xl font-bold text-green-600 mt-3">
            ₱{totalCollected.toLocaleString()}
          </p>
        </div>

        {/* CHART */}
        <div className="bg-white w-full md:w-2/3 p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Payment Overview ({selectedFilter})
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg p-2"
        />

        <div className="flex gap-2">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-lg ${
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Tenant</th>
              <th className="py-3 px-4 text-left">Room</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount (₱)</th>
              <th className="py-3 px-4 text-left">Date Paid / Due</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Method</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {mergedPayments.map((p, index) => (
              <tr key={p.id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4">{p.tenantName}</td>
                <td className="py-3 px-4">{p.roomNumber}</td>
                <td className="py-3 px-4">{p.roomType}</td>
                <td className="py-3 px-4">{p.rent.toLocaleString()}</td>
                <td className="py-3 px-4">{p.dueDate}</td>

                {/* Status */}
                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <select
                      value={p.status}
                      onChange={(e) =>
                        setPayments((prev) =>
                          prev.map((x, i) =>
                            i === index ? { ...x, status: e.target.value } : x
                          )
                        )
                      }
                      className="border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    <span
                      className={`font-semibold ${
                        p.status === "Completed"
                          ? "text-green-600"
                          : p.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  )}
                </td>

                {/* Method */}
                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <select
                      value={p.payment_method}
                      onChange={(e) =>
                        setPayments((prev) =>
                          prev.map((x, i) =>
                            i === index
                              ? { ...x, payment_method: e.target.value }
                              : x
                          )
                        )
                      }
                      className="border rounded p-1"
                    >
                      <option value="GCash">GCash</option>
                      <option value="Cash">Cash</option>
                    </select>
                  ) : (
                    p.payment_method
                  )}
                </td>

                {/* Action */}
                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSave(index, p)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
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
