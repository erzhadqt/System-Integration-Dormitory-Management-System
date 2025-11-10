import React, { useState, useEffect } from "react";
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from "recharts";

function Payment() {
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalCollected, setTotalCollected] = useState(0);

  const [payments, setPayments] = useState([
    {name: "John Doe",roomNumber: "101",roomType: "Single",rent: 5000,dueDate: "2025-11-08T09:00",status: "Paid",notes: " ",},
    {name: "Jane Smith",roomNumber: "202",roomType: "Double",rent: 7500,dueDate: "2025-11-08T14:00",status: "Hold",notes: " ",},
    {name: "Alex Cruz",roomNumber: "303",roomType: "Studio",rent: 10000,dueDate: "2025-11-09T11:00",status: "Pending",notes: " ",},
  ]);

  const [chartData, setChartData] = useState([]);

  const getChartDataByFilter = () => {
    const filtered = payments.filter((p) => p.status === "Paid");
    const selected = selectedDate ? new Date(selectedDate) : new Date();

    if (selectedFilter === "Daily") {
      const data = Array.from({ length: 24 }, (_, hour) => ({
        name: `${hour}:00`,
        amount: 0,
      }));
      filtered.forEach((p) => {
        const date = new Date(p.dueDate);
        if (date.toDateString() === selected.toDateString()) {
          const hour = date.getHours();
          data[hour].amount += p.rent;
        }
      });
      return data;
    } else if (selectedFilter === "Weekly") {
      const startOfWeek = new Date(selected);
      startOfWeek.setDate(selected.getDate() - selected.getDay() + 1); 
      const data = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return { name: d.toLocaleDateString("en-US", { weekday: "short" }), amount: 0, date: d };
      });
      filtered.forEach((p) => {
        const date = new Date(p.dueDate);
        data.forEach((d) => {
          if (date.toDateString() === d.date.toDateString()) d.amount += p.rent;
        });
      });
      return data;
    } else if (selectedFilter === "Monthly") {
      const year = selected.getFullYear();
      const month = selected.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const data = Array.from({ length: daysInMonth }, (_, i) => ({
        name: (i + 1).toString(),
        amount: 0,
      }));
      filtered.forEach((p) => {
        const date = new Date(p.dueDate);
        if (date.getMonth() === month && date.getFullYear() === year) {
          data[date.getDate() - 1].amount += p.rent;
        }
      });
      return data;
    } else if (selectedFilter === "Yearly") {
      const year = selected.getFullYear();
      const data = Array.from({ length: 12 }, (_, i) => ({
        name: new Date(year, i).toLocaleString("en-US", { month: "short" }),
        amount: 0,
      }));
      filtered.forEach((p) => {
        const date = new Date(p.dueDate);
        if (date.getFullYear() === year) {
          data[date.getMonth()].amount += p.rent;
        }
      });
      return data;
    }
  };

  useEffect(() => {
    const newChartData = getChartDataByFilter();
    setChartData(newChartData);
    const total = newChartData.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalCollected(total);
  }, [payments, selectedDate, selectedFilter]);

  const handleSave = (index, updatedTenant) => {
    const updatedPayments = [...payments];
    updatedPayments[index] = updatedTenant;
    setPayments(updatedPayments);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Payment
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-10">
        <div className="bg-white w-full md:w-1/3 p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col justify-center text-center h-64">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Collected
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-4">
            ₱{totalCollected.toLocaleString()}
          </p>
          <p className="text-gray-500 mt-2">Overall Payment Collected</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 w-full md:w-2/3 h-64 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-blue-700 mb-4 text-center">
            Payment Overview ({selectedFilter})
          </h2>
          <ResponsiveContainer width="100%" height="100%">
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

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          {["Daily", "Weekly", "Monthly", "Yearly"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Tenant Name</th>
              <th className="py-3 px-4 text-left">Room #</th>
              <th className="py-3 px-4 text-left">Room Type</th>
              <th className="py-3 px-4 text-left">Rent (₱)</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Notes</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((tenant, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4">{tenant.name}</td>
                <td className="py-3 px-4">{tenant.roomNumber}</td>
                <td className="py-3 px-4">{tenant.roomType}</td>
                <td className="py-3 px-4">{tenant.rent.toLocaleString()}</td>
                <td className="py-3 px-4">{tenant.dueDate}</td>

                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <select
                      value={tenant.status}
                      onChange={(e) =>
                        setPayments((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, status: e.target.value } : p
                          )
                        )
                      }
                      className="border rounded-md p-1"
                    >
                      <option>Paid</option>
                      <option>Hold</option>
                      <option>Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`font-semibold ${
                        tenant.status === "Paid"
                          ? "text-green-600"
                          : tenant.status === "Hold"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  )}
                </td>

                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tenant.notes}
                      onChange={(e) =>
                        setPayments((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, notes: e.target.value } : p
                          )
                        )
                      }
                      className="border rounded-md p-1 w-full"
                    />
                  ) : (
                    tenant.notes
                  )}
                </td>

                <td className="py-3 px-4">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSave(index, tenant)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
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
