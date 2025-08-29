import React, { useState } from "react";

const Dashboard = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const handleClockIn = () => {
    setClockedIn(true);
    setClockedOut(false);
    setPopupMsg("✅ You have successfully clocked in at 10:00 AM.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleClockOut = () => {
    setClockedOut(true);
    setPopupMsg("✅ You have successfully clocked out at 7:00 PM.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    setPopupMsg("📩 Leave application submitted successfully.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setLeaveReason("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Company Name */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Innovative Technology Private Limited
      </h1>

      {/* Clock In / Out Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Attendance Panel</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClockIn}
            disabled={clockedIn}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md ${
              clockedIn ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Clock In (10:00 AM)
          </button>

          <button
            onClick={handleClockOut}
            disabled={!clockedIn || clockedOut}
            className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md ${
              clockedOut ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Clock Out (7:00 PM)
          </button>
        </div>
      </div>

      {/* Leave Application */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
        <form onSubmit={handleLeaveSubmit} className="space-y-4">
          <textarea
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            placeholder="Enter reason for leave..."
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Submit Leave
          </button>
        </form>
        {leaveSubmitted && (
          <p className="text-green-600 mt-3 text-center font-medium">
            ✅ Leave request submitted.
          </p>
        )}
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          {popupMsg}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
