import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CountryFlag from "react-country-flag";
import BookingsBySlot from "./BookingsBySlot";

function PublishedBookings() {
  const [date, setDate] = useState(new Date());
  const [tours, setTours] = useState([]);
  const [expandedLanguages, setExpandedLanguages] = useState({});
  const formattedSelectedDate = date.toISOString().split("T")[0];
  

  // Function to fetch tours
  // Function to fetch tours along with their bookings
  const fetchTours = async () => {
    const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from the environment variable

    try {
      const response = await fetch(`${apiUrl}/api/tours-with-bookings`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log("Fetched Tours with Bookings Data:", data); // Log the fetched data

      const filteredTours = filterToursByDate(data, date);
      console.log("Filtered Tours:", filteredTours); // Debugging: Log filtered tours

      setTours(filteredTours);
    } catch (error) {
      console.error("Error fetching tours:", error);
      // Handle error as needed
    }
  };

  const filterToursByDate = (tours, selectedDate) => {
    return tours.filter((tour) => {
      const monthIndex = selectedDate.getMonth();
      const dayIndex = selectedDate.getDay();

      return tour.activeMonths[monthIndex] && tour.activeDays[dayIndex];
    });
  };

  useEffect(() => {
    console.log("Component re-rendered"); // Log component re-renders

    fetchTours();
  }, [date]); // The useEffect will re-run when 'date' changes

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Optionally, reset selectedTour and selectedLanguage here
  };

  const toggleLanguageDetails = (slotId) => {
    const expandedKey = slotId;
    const newExpandedLanguages = {
      ...expandedLanguages,
      [expandedKey]: !expandedLanguages[expandedKey],
    };

    console.log("Updated expandedLanguages:", newExpandedLanguages);
    setExpandedLanguages(newExpandedLanguages);
  };

  const handleLockToggle = async (tourId, language, timeSlot) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date to 'YYYY-MM-DD'

    // Find the current lock status for the specified date
    const currentTour = tours.find((tour) => tour._id === tourId);
    const session = currentTour.languagesWithTimeSlots.find(
      (slot) => slot.language === language && slot.startTime === timeSlot
    );

    // Initialize lockStatusByDate if it doesn't exist
    if (!session.lockStatusByDate) {
      session.lockStatusByDate = {};
    }

    const currentLockStatus = session.lockStatusByDate[formattedDate] || false;
    const newLockStatus = !currentLockStatus;

    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from the environment variable

      const response = await fetch(
        `${apiUrl}/api/tours/${tourId}/language-session-lock`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            timeSlot,
            date: formattedDate, // Use the formattedSelectedDate here
            lockStatus: newLockStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lock status");
      }
      console.log(
        `Response from server for ${language} at ${timeSlot}:`,
        response
      );
      console.log(
        `New lock status for ${language} at ${timeSlot}:`,
        newLockStatus
      );

      const updatedTours = tours.map((tour) => {
        if (tour._id === tourId) {
          return {
            ...tour,
            languagesWithTimeSlots: tour.languagesWithTimeSlots.map((slot) => {
              if (slot.language === language && slot.startTime === timeSlot) {
                return {
                  ...slot,
                  lockStatusByDate: {
                    ...slot.lockStatusByDate,
                    [formattedDate]: newLockStatus,
                  },
                };
              }
              return slot;
            }),
          };
        }
        return tour;
      });

      setTours(updatedTours);
      console.log("Updated Tours after lock/unlock:", updatedTours);
    } catch (error) {}
  };

  const countBookingsByStatus = (slotId, status, selectedDate) => {
    return tours.flatMap((tour) =>
      tour.bookings.filter(
        (booking) =>
          booking.slotId === slotId &&
          booking.status === status &&
          new Date(booking.reservation.tour.date)
            .toISOString()
            .split("T")[0] === selectedDate
      )
    ).length;
  };

  const getCountryCodeFromLanguage = (language) => {
    const languageToCountryCode = {
      English: "GB",
      Spanish: "ES",
      French: "FR",
      German: "DE",
      // ... other languages
    };

    return languageToCountryCode[language] || "defaultCountryCode"; // Replace 'defaultCountryCode' with a default value
  };

  console.log("Tours Data:", tours);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-center w-full mb-8">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded shadow w-full"
        />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="p-4 border border-gray-200 rounded shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{tour.name}</h3>
              {tour.languagesWithTimeSlots &&
              tour.languagesWithTimeSlots.length > 0 ? (
                tour.languagesWithTimeSlots.map((slot) => {
                  const lockStatusByDate = slot.lockStatusByDate || {};

                  const isLocked =
                    lockStatusByDate[formattedSelectedDate] || false;
                  const confirmedCount = countBookingsByStatus(
                    slot._id,
                    "confirmed",
                    formattedSelectedDate
                  );
                  const cancelledCount = countBookingsByStatus(
                    slot._id,
                    "cancelled",
                    formattedSelectedDate
                  );

                  return (
                    <div
                      key={slot._id}
                      className={`mb-4 p-4 rounded-lg shadow-lg ${
                        isLocked ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      <div
                        onClick={() => toggleLanguageDetails(slot._id)}
                        className="flex items-center mb-2 sm:mb-0"
                      >
                        <CountryFlag
                          countryCode={getCountryCodeFromLanguage(
                            slot.language
                          )}
                          svg
                        />
                        <span className="ml-2 text-sm sm:text-base">{slot.language}</span>

                        <span className="ml-2 font-semibold text-sm sm:text-base ">
                          {slot.startTime}
                        </span>
                        <div className="flex sm:flex-row items-center text-xs ml-4">
                      <span className="text-green-500">{`Conf.: ${confirmedCount}`}</span>
                      <span className="mx-1">|</span>
                      <span className="text-red-500">{`Canc.: ${cancelledCount}`}</span>
                    </div>

                      </div>

                      <button
                        className={`mt-2 py-2 px-4 text-sm text-white font-bold ${
                          isLocked ? "bg-red-500" : "bg-green-500"
                        }`}
                        onClick={() =>
                          handleLockToggle(
                            tour._id,
                            slot.language,
                            slot.startTime
                          )
                        }
                      >
                        {isLocked ? "Unlock Slot" : "Lock Slot"}
                      </button>

                      {expandedLanguages[slot._id] && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                          <h3 className="font-semibold text-sm sm:text-base">Bookings</h3>
                          <BookingsBySlot
                            slot={slot}
                            bookings={tour.bookings.filter(
                              (booking) => booking.slotId === slot._id
                            )}
                            tourDate={date}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No languages available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PublishedBookings;
