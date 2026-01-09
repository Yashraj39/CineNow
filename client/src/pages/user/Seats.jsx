import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Seats = () => {
  // Seat data with section + price
  const seatSections = [
    {
      name: "ROYAL",
      price: 310,
      rows: [
        { row: "A", booked: [1, 2, 3, 4, 10] },
        { row: "B", booked: [] },
        { row: "C", booked: [6, 7, 8] },
      ],
    },
    {
      name: "CLUB",
      price: 250,
      rows: [
        { row: "D", booked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { row: "E", booked: [1, 2, 3, 9, 15, 16] },
        { row: "F", booked: [4, 5, 6] },
      ],
    },
    {
      name: "EXECUTIVE",
      price: 180,
      rows: [
        { row: "G", booked: [12, 13, 14, 15] },
        { row: "H", booked: [] },
        { row: "I", booked: [2, 3] },
        { row: "J", booked: [14, 15] },
      ],
    },
  ];

  const totalSeats = 16;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (sectionName, row, seat, price) => {
    const seatId = `${sectionName}-${row}${seat}`;
    if (selectedSeats.find((s) => s.id === seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, price }]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // -------- Booking Function --------
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));
    if (!selectedShow) {
      alert("No show selected!");
      return;
    }

    const bookingData = {
      movieName: selectedShow.showName,
      cinemaName: "INOX - City Center",
      showTime: selectedShow.time,
      date: selectedShow.date,
      seats: selectedSeats.map((s) => s.id),
      totalPrice: totalPrice,
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // VERY IMPORTANT for session
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data = await res.json();
      alert("Booking successful!");
      navigate("/my-booking");
    } catch (err) {
      console.error(err);
      alert("Booking failed, please login first.");
    }
  };


  return (
    <div className="p-4 sm:p-20 lg:p-10 flex flex-col gap-10 items-center">
      {seatSections.map((section, secIndex) => (
        <div key={secIndex} className="flex flex-col gap-7 items-center w-full">
          {/* Section Title */}
          <h2 className="text-base sm:text-lg font-bold text-center">
            {section.name} - Rs.{section.price}
          </h2>

          {/* Rows */}
          {section.rows.map(({ row, booked }, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto w-full px-2"
            >
              <p className="w-6 flex-shrink-0 font-medium">{row}</p>
              <div className="flex gap-1 sm:gap-7 flex-wrap justify-center">
                {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => {
                  const seatId = `${section.name}-${row}${seat}`;
                  const isBooked = booked.includes(seat);
                  const isSelected = selectedSeats.find((s) => s.id === seatId);

                  return (
                    <button
                      key={seat}
                      className={`w-7 h-7 sm:w-8 sm:h-8 border rounded text-xs sm:text-sm
                        ${isBooked ? "bg-gray-300 text-black cursor-not-allowed" : ""}
                        ${!isBooked && isSelected ? "bg-blue-500 text-white" : ""}
                        ${!isBooked && !isSelected ? "bg-green-500 text-white" : ""}`}
                      disabled={isBooked}
                      onClick={() => toggleSeat(section.name, row, seat, section.price)}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Summary */}
      <div className="fixed bottom-0 left-0 bg-blue-500 w-full pt-4 pb-4 px-3 sm:px-6 text-center shadow-lg">
        <h3 className="font-bold text-white text-sm sm:text-base">
          Selected Seats:
        </h3>
        <p className="text-white text-xs sm:text-sm truncate">
          {selectedSeats.map((s) => s.id).join(", ") || "None"}
        </p>
        <h3 className="font-bold text-white mt-2 text-sm sm:text-base">
          Total Price: Rs. {totalPrice}
        </h3>
        <button
          onClick={handleBooking}
          className="mt-3 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg text-sm sm:text-base"
        >
          Book
        </button>
      </div>

      {/* Spacer divs for scroll space */}
      <div className="w-96"></div>
      <div className="w-96"></div>
      <div className="w-96"></div>
      <div className="w-96"></div>
    </div>
  );
};
