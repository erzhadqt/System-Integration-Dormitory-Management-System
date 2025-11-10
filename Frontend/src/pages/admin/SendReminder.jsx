import React from "react";

function SendReminder() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-sky-700 mb-4">Send Reminder</h2>
      <form className="space-y-4">
        <textarea placeholder="Message" className="w-full border p-2 rounded-lg" rows="4" />
        <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition">
          Send
        </button>
      </form>
    </div>
  );
}

export default SendReminder;
