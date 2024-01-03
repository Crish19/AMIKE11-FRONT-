import CountryFlag from "react-country-flag";
import BookingForm from "./BookingForm";
import TravelersPopup from "./TravelersPopup";
import TourTicket from "./TourTicket";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function BookingWidget({ selectedTourId }) {
  const api = 'https://obscure-sierra-26039-89103941a3f4.herokuapp.com'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [adultsCount, setAdultsCount] = useState(1);
  const [infantsCount, setInfantsCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [, setIsNameValid] = useState(true);
  const [, setIsEmailValid] = useState(true);
  const [, setIsPhoneValid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]); // State for storing fetched tours
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedTourData, setSelectedTourData] = useState(null);
  const [selectedLanguageSlot, setSelectedLanguageSlot] = useState(null);
  const selectedTourName =
    tours.find((tour) => tour._id === selectedTour)?.name || "No tour selected";

  const currentDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTourId) {
      setSelectedTour(selectedTourId);
      const tourData = tours.find((tour) => tour._id === selectedTourId);
      setSelectedTourData(tourData);
      if (tourData) {
      }
    }
  }, [selectedTourId, tours]);

  //.............................................................................................................................

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${api}/api/tours`);
        setTours(response.data);
        console.log("Fetched Tours:", response.data); // Log the fetched tours
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  const handleTourSelect = (tourId) => {
    setSelectedTour(tourId);

    if (tourId === "") {
      setSelectedTourData(null);
    } else {
      const selectedTour = tours.find((tour) => tour._id === tourId);
      setSelectedTourData(selectedTour);

      // Revalidate or reset the selected date
      if (selectedDate && !isDateAvailableForTour(selectedDate, selectedTour)) {
        setSelectedDate(null);
      }
    }
  };

  const isDateAvailableForTour = (dateString, tour) => {
    if (!tour) return false;

    const date = new Date(dateString);
    const month = date.getMonth();
    const dayOfWeek = date.getDay();

    return tour.activeMonths[month] && tour.activeDays[dayOfWeek];
  };

  const isDateAvailable = (dateString) => {
    if (!selectedTourData) return false;

    const date = new Date(dateString);
    const month = date.getMonth(); // getMonth() returns 0-11 for Jan-Dec
    const dayOfWeek = date.getDay(); // getDay() returns 0-6 for Sun-Sat

    return (
      selectedTourData.activeMonths[month] &&
      selectedTourData.activeDays[dayOfWeek]
    );
  };

  const handleDateChange = (date) => {
    if (selectedTourData && isDateAvailableForTour(date, selectedTourData)) {
      setSelectedDate(date);
    } else {
      alert("Selected date is not available for this tour.");
    }
  };

  const getAvailableTimes = () => {
    if (!selectedDate || !selectedTourData) return [];

    const times = selectedTourData.languagesWithTimeSlots.map(
      (slot) => slot.startTime
    );
    console.log("Available Times for Selected Date:", times);
    return times;
  };

  useEffect(() => {
    if (selectedTourData) {
      console.log("Selected Tour Data:", selectedTourData);
    }
  }, [selectedTourData]); // This effect runs whenever selectedTourData changes

  const toggleLanguageSelection = (language, time, slotId) => {
    if (
      selectedLanguageSlot &&
      selectedLanguageSlot.language === language &&
      selectedLanguageSlot.time === time
    ) {
      setSelectedLanguageSlot(null);
      setSelectedLanguages([]);
      setSelectedTime(null);
    } else {
      setSelectedLanguageSlot({ language, time, _id: slotId });
      setSelectedLanguages([language]);
      setSelectedTime(time);
    }
  };

  const isSlotLocked = (slot) => {
    if (!selectedDate) return false;

    const formattedSelectedDate = selectedDate.toISOString().split("T")[0];
    const locked = slot.lockStatusByDate?.[formattedSelectedDate] === true;
    console.log(
      `Checking if slot is locked: ${slot.language} at ${slot.startTime} on ${formattedSelectedDate}: ${locked}`
    );
    return locked;
  };

  //.............................................................................................................................

  const isDateTimeInPast = () => {
    if (selectedDate && selectedTime) {
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      return selectedDateTime < currentDate;
    }
    return false;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSelectedLanguages([]);
  };

  const incrementCount = (type) => {
    if (type === "adults" && adultsCount < 20) {
      setAdultsCount(adultsCount + 1);
    } else if (type === "infants" && infantsCount < 20) {
      setInfantsCount(infantsCount + 1);
    }
  };

  const decrementCount = (type) => {
    if (type === "adults" && adultsCount > 1) {
      setAdultsCount(adultsCount - 1);
    } else if (type === "infants" && infantsCount > 0) {
      setInfantsCount(infantsCount - 1);
    }
  };

  const handleAccept = () => {
    setShowPopup(false); // Close the popup when "Accept" is clicked
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only alphabetic characters, spaces, and hyphens
    if (/^[a-zA-Z\s-]*$/.test(value)) {
      setName(value);
      setIsNameValid(value.trim() !== ""); // Check if the name is not empty
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Check if the email matches a basic email pattern
    setIsEmailValid(/^\S+@\S+\.\S+$/.test(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numeric characters and plus sign
    if (/^[0-9+]*$/.test(value)) {
      setPhone(value);
      setIsPhoneValid(value.trim() !== ""); // Check if the phone number is not empty
    }
  };
  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      selectedLanguages.length > 0 &&
      name.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(email) && // Check if the email matches a basic email pattern
      phone.trim() !== "" &&
      adultsCount + infantsCount >= 1 // Ensure at least one traveler
    );
  };

  const handleBooking = async () => {
    setIsLoading(true);
    if (isDateTimeInPast()) {
      alert("Cannot book a tour for a past date or time.");
      setIsLoading(false);
      return;
    }
    try {
      if (isFormValid()) {
        const reservationData = {
          name,
          email,
          phone,
          tourName: selectedTourName,
          date: selectedDate,
          time: selectedTime,
          languages: selectedLanguages,
          travelers: adultsCount + infantsCount,
        };

        console.log("Reservation Data being sent:", reservationData); // Add this line

        // Create a reservation
        const reservationResponse = await axios.post(
          `${api}/api/reservations/create`,

          reservationData
        );
        console.log("Reservation Response:", reservationResponse.data); // Log the reservation response

        if (reservationResponse.status === 201) {
          console.log("Reservation Response:", reservationResponse.data);

          // Reservation created, get the reservation ID
          const reservationId = reservationResponse.data._id;
          const slotId = selectedLanguageSlot?._id;

          // Create a booking associated with the reservation
          const bookingData = {
            name,
            email,
            phone,
            reservationId,
            slotId,
          };

          // Create a booking
          const bookingResponse = await axios.post(
            `${api}/api/bookings`,

            bookingData
          );
          console.log("Booking Response:", bookingResponse.data); // Add this line to log the response

          if (bookingResponse.status === 201) {
            const bookingId = bookingResponse.data._id; // Get the ID of the newly created booking

            try {
              // Add a step to link the booking with the tour
              await axios.put(
                `${api}/api/tours/${selectedTour}/add-booking`,
                { bookingId }
              );
              alert("Booking confirmed and added to tour.");

              // ... rest of your success handling code ...
            } catch (error) {
              console.error("Error linking booking with tour:", error);
              alert("Failed to link booking with tour.");
            }
          }

          // Handle success and clear form
          if (bookingResponse.data) {
            const bookingData = bookingResponse.data;
            const bookingConfirmationMessage = `Booking confirmed for ${bookingData.name}. You will receive a confirmation email shortly.`;
            console.log("Booking Data:", bookingData);
            alert(bookingConfirmationMessage);

            if (bookingResponse.status === 201) {
              // Show confirmation alert
              alert("Booking confirmed. You will be redirected shortly.");

              // Set a timeout for redirection
              setTimeout(() => {
                navigate("/booking"); // Replace with the path you want to redirect to
              }, 5000); // Delay of 5 seconds
            }

            // Clear the form here
            setName("");
            setEmail("");
            setPhone("");
            setShowModal(false);
          } else {
            console.error("Invalid booking response:", bookingResponse.data);

            // Log the entire response to understand what's being returned
            console.log("Full Booking Response:", bookingResponse);

            alert(
              "Booking confirmation failed. Please check the console for details."
            );
          }
          setIsLoading(false);
          setName("");
          setEmail("");
          setPhone("");
          setShowModal(false);
        } else {
          setIsLoading(false);
          throw new Error("Failed to create a reservation");
        }
      } else {
        alert("Please fill in all required fields correctly");
        setIsLoading(false); // Reset the isLoading state to false
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false); // Reset the isLoading state to false
    }
  };

  return (
    <div className="booking-widget mt-12 sticky top-12 shadow-2xl mx-auto max-w-md md:max-w-lg border rounded-3xl mb-5">
      <div className="border border-gray-500 p-3 md:p-4 rounded-3xl shadow-lg">
        <p className="mb-7 font-bold">
          Booking also by{" "}
          <a
            href="https://api.whatsapp.com/send?phone=46729406310"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 font-semibold hover:underline"
          >
            WhatsApp
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="inline-block w-5 h-5 ml-1"
            >
              {/* WhatsApp icon */}
              <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              />
            </svg>
          </a>{" "}
        </p>

        <div className="mt-8">
          <h2 className="font-bold text-lg md:text-xl mb-2">Book your tour</h2>

          {/* Tour Selection Dropdown */}
          <div className="">
            <div className=" tour-menu mb-4">
              <div className="">
                <select
                  id="tourSelect"
                  value={selectedTour}
                  onChange={(e) => handleTourSelect(e.target.value)}
                  className="tour-select-dropdown w-full border border-gray-300 rounded-xl text-xs md:text-sm"
                >
                  <option value="">Select a Tour</option>
                  {tours.map((tour) => (
                    <option
                      key={tour._id}
                      value={tour._id}
                      className="truncate"
                    >
                      {tour.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Picker*/}
            <div className="flex items-center border border-gray-300 rounded-xl md:p-3 mb-2 w-full text-xs md:text-sm ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5 ml-2"
              >
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path
                  fill-rule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <DatePicker
                placeholderText="Select a date"
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                filterDate={(date) =>
                  selectedTourData
                    ? isDateAvailableForTour(date, selectedTourData)
                    : false
                }
                className="datepicker-custom ml-1" // Updated className
                popperPlacement="bottom-start"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: "5px, 10px", // Adjust offset as needed
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
              />
            </div>

            {/* Travelers Box */}
            <div className=" ">
              <TravelersPopup
                showPopup={showPopup}
                adultsCount={adultsCount}
                infantsCount={infantsCount}
                decrementCount={decrementCount}
                incrementCount={incrementCount}
                handleAccept={handleAccept}
                setShowPopup={setShowPopup}
              />
            </div>
          </div>
          {/* Available Languages */}
          {selectedDate && selectedTourData && (
            <div className="mt-3">
              <h3 className="font-semibold mb-2">
                Available Languages and Times:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedTourData.languagesWithTimeSlots
                  .filter((slot) => !isSlotLocked(slot))
                  .map((slot, index) => (
                    <div
                      key={index}
                      className={`language-slot rounded-full border ${
                        selectedLanguageSlot &&
                        selectedLanguageSlot.language === slot.language &&
                        selectedLanguageSlot.time === slot.startTime
                          ? "border-orange-500 bg-orange-100"
                          : "border-gray-300 hover:bg-orange-100 hover:border-orange-500"
                      } p-2 flex items-center justify-center cursor-pointer`}
                      onClick={() =>
                        toggleLanguageSelection(
                          slot.language,
                          slot.startTime,
                          slot._id
                        )
                      }
                    >
                      <CountryFlag
                        countryCode={
                          slot.language === "Spanish"
                            ? "ES"
                            : slot.language === "English"
                            ? "GB"
                            : slot.language === "German"
                            ? "DE"
                            : slot.language === "French"
                            ? "FR"
                            : ""
                        }
                        svg
                        style={{ width: "15px", height: "15px" }}
                      />
                      <span className=" ml-3 md:text-l text-xs">{`${slot.language} ${slot.startTime}`}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <TourTicket
          selectedTourName={selectedTourName}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedLanguages={selectedLanguages}
          adultsCount={adultsCount}
          infantsCount={infantsCount}
        />

        <p className="text-xs text-center mt-3">
          <span className="text-red-500 ">Cancellation</span> is recommended 2
          hours before your tour.
        </p>

        <button
          onClick={() => {
            if (
              selectedDate &&
              selectedTime &&
              selectedLanguages.length > 0 &&
              adultsCount + infantsCount >= 1
            ) {
              setShowModal(true);
            } else {
              alert(
                "Please select a date, time, number of travelers and a language."
              );
            }
          }}
          className="bg-orange-500 text-white py-2 px-4 rounded-md w-full mt-4 text-sm md:text-base"
        >
          Reserve Now
        </button>
        <BookingForm
          showModal={showModal}
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedLanguages={selectedLanguages}
          handleBooking={handleBooking}
          isFormValid={isFormValid}
          name={name}
          handleNameChange={handleNameChange}
          email={email}
          handleEmailChange={handleEmailChange}
          phone={phone}
          handlePhoneChange={handlePhoneChange}
          setName={setName} // Pass the state updater functions as props
          setEmail={setEmail}
          setPhone={setPhone}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export default BookingWidget;
