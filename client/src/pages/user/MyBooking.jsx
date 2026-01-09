import React, { useEffect, useState } from "react";

export const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-4 border rounded-lg shadow bg-blue-500 text-white"
            >
              <h2 className="font-semibold text-lg">{b.movieName}</h2>
              <p>📅 Date: {b.date}</p>
              <p>⏰ Show Time: {b.showTime}</p>
              <p>🎬 Cinema: {b.cinemaName}</p>
              <p>💺 Seats: {b.seats.join(", ")}</p>
              <p>💰 Total Price: ₹{b.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
