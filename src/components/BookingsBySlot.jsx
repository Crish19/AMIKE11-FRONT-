import React from "react";

function BookingCard({ booking }) {
  const handleClick = (event) => {
    event.stopPropagation();
    // Any additional click handling logic goes here
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden"
    >
      <div className="font-semibold text-sm sm:text-base break-words">
        {booking.name}
      </div>
      <a
        href={`mailto:${booking.email}`}
        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm break-words"
      >
        {booking.email}
      </a>
      <a
        href={`tel:${booking.phone}`}
        className="block text-green-600 hover:text-green-800 text-sm sm:text-base break-words"
      >
        {booking.phone}
      </a>
    </div>
  );
}

function BookingsBySlot({ slot, bookings, tourDate }) {
  const formattedTourDate = new Date(tourDate).setHours(0, 0, 0, 0);

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed" &&
      new Date(booking.reservation.tour.date).setHours(0, 0, 0, 0) ===
        formattedTourDate &&
      !booking.locked
  );

  const canceledBookings = bookings.filter(
    (booking) =>
      booking.status === "cancelled" &&
      new Date(booking.reservation.tour.date).setHours(0, 0, 0, 0) ===
        formattedTourDate &&
      !booking.locked
  );

  return (
    <div className="bookings-container px-2 py-2">
      <h4 className="font-bold text-lg mb-3 text-blue-600">
        Confirmed Bookings:
      </h4>
      <div className="grid grid-cols-1 gap-4">
        {confirmedBookings.length > 0 ? (
          confirmedBookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p>No confirmed bookings for this slot.</p>
        )}
      </div>

      <h4 className="font-bold text-lg  mt-6 mb-3 text-red-600">
        Cancelled Bookings:
      </h4>
      <div className="grid grid-cols-1 gap-4">
        {canceledBookings.length > 0 ? (
          canceledBookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p>No cancelled bookings for this slot.</p>
        )}
      </div>
    </div>
  );
}

export default BookingsBySlot;
