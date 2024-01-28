import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function AddTourForm({ tourData }) {
  const api = 'http://localhost:3001'
  const isEditing = !!tourData;
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [activeMonths, setActiveMonths] = useState(new Array(12).fill(false));
  const [activeDays, setActiveDays] = useState(new Array(7).fill(false));
  const [availabilityOption, setAvailabilityOption] = useState("Full Year");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Define day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const initializeFormData = useCallback(() => {
    if (isEditing && tourData) {
      return { ...tourData };
    } else {
      return {
        name: "",
        overview: "",
        meetingInfo: "",
        expectations: "",
        additionalInfo: "",
        duration: "",
        languagesOffered: [],
        meetingAddress: "",
        googleMapsLink: "",
        additionalMeetingInfo: "",
        itinerary: [],
      };
    }
  }, [isEditing, tourData]);

  const [tourFormData, setTourFormData] = useState(initializeFormData);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languagesWithTimeSlots, setLanguagesWithTimeSlots] = useState({});

  useEffect(() => {
    console.log("Initial tour data in editing mode:", tourData);
    console.log("Editing Mode: ", isEditing);
    console.log("Tour Data on Edit: ", tourData);

    if (isEditing && tourData) {
      setTourFormData({ ...tourData });
      setSelectedLanguages(tourData.languagesOffered || []);

      // Ensure unique languages
      const uniqueLanguages = new Set(tourData.languagesOffered || []);
      setSelectedLanguages(Array.from(uniqueLanguages));

      // Initialize languagesWithTimeSlots for existing tour
      const initialTimeSlots = {};
      tourData.languagesWithTimeSlots.forEach((slot) => {
        if (!initialTimeSlots[slot.language]) {
          initialTimeSlots[slot.language] = [];
        }
        initialTimeSlots[slot.language].push(slot.startTime);
      });
      setLanguagesWithTimeSlots(initialTimeSlots);

      console.log("Initial Time Slots: ", initialTimeSlots);

      // Directly set activeMonths and activeDays from existing tour data
      setActiveMonths(tourData.activeMonths);
      setActiveDays(tourData.activeDays);

      // Set availability option based on existing tour data
      if (tourData.startDate && tourData.endDate) {
        setAvailabilityOption("Date Range");
        setStartDate(tourData.startDate.split("T")[0]);
        setEndDate(tourData.endDate.split("T")[0]);
      } else if (tourData.activeMonths.some((month) => month)) {
        setAvailabilityOption(
          tourData.activeMonths.every((month) => month)
            ? "Full Year"
            : "Monthly"
        );
      } else {
        setAvailabilityOption("Full Year");
      }
    } else {
      // Reset form for adding new tour
      setTourFormData(initializeFormData());
      setSelectedLanguages([]);
      setLanguagesWithTimeSlots({});
      setActiveMonths(new Array(12).fill(true)); // Default to full year
      setActiveDays(new Array(7).fill(true)); // Default to no days selected
      setAvailabilityOption("Full Year");
    }
  }, [isEditing, tourData, initializeFormData]);

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = tourFormData.itinerary.map((point, i) =>
      i === index ? { ...point, [field]: value } : point
    );
    setTourFormData({ ...tourFormData, itinerary: updatedItinerary });
  };

  const addItineraryPoint = () => {
    setTourFormData({
      ...tourFormData,
      itinerary: [...tourFormData.itinerary, { title: "", description: "" }],
    });
  };

  const removeItineraryPoint = (index) => {
    const filteredItinerary = tourFormData.itinerary.filter(
      (_, i) => i !== index
    );
    setTourFormData({ ...tourFormData, itinerary: filteredItinerary });
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleInputChange = (e) => {
    setTourFormData({ ...tourFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tourFormData.name || !tourFormData.duration) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("activeMonths (before conversion):", activeMonths);
    console.log("activeDays (before conversion):", activeDays);

    const formData = new FormData();
    images.forEach((image) => formData.append("tourImages", image));

    // Append other tour data to formData
    // for (const key in tourFormData) {
    //   if (key === "languagesOffered") {
    // Append each language separately



    const uniqueLanguages = new Set(selectedLanguages);
    uniqueLanguages.forEach((language) => {
      formData.append("languagesOffered", language);
    });

    // Append the rest of the tourFormData to formData
    Object.entries(tourFormData).forEach(([key, value]) => {
      if (key !== "languagesOffered" && key !== "languagesWithTimeSlots") {
        if (key === "itinerary") {
          // Convert itinerary array to JSON string
          formData.append("itinerary", JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    console.log("Itinerary before submission:", tourFormData.itinerary);

    // Process languagesWithTimeSlots for submission
    const formattedLanguagesWithTimeSlots = [];
    Object.entries(languagesWithTimeSlots).forEach(([language, timeSlots]) => {
      if (Array.isArray(timeSlots)) {
        timeSlots.forEach((startTime) => {
          formattedLanguagesWithTimeSlots.push({ language, startTime });
        });
      } else {
        console.error(`Expected an array for time slots, got:`, timeSlots);
      }
    });

    // Add the transformed languagesWithTimeSlots to your formData
    console.log(
      "Formatted languagesWithTimeSlots:",
      formattedLanguagesWithTimeSlots
    );

    formData.append(
      "languagesWithTimeSlots",
      JSON.stringify(formattedLanguagesWithTimeSlots)
    );

    formData.append("activeMonths", JSON.stringify(activeMonths));
    formData.append("activeDays", JSON.stringify(activeDays));

    // Append startDate and endDate to formData if they are available
    if (startDate) {
      formData.append("startDate", startDate);
    }
    if (endDate) {
      formData.append("endDate", endDate);
    }

    try {
      const url = isEditing ? `${api}/api/tours/${tourFormData._id}` : "/api/tours";
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert(
          isEditing
            ? "Tour successfully updated!"
            : "Tour successfully submitted!"
        );
        navigate("/admin");
      } else {
        const error = await response.json();
        console.error("Server responded with an error:", error);
        alert("Failed to submit the tour. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleTimeChange = (language, index, newTime) => {
    setLanguagesWithTimeSlots((prevSlots) => ({
      ...prevSlots,
      [language]: prevSlots[language].map((time, i) =>
        i === index ? newTime : time
      ),
    }));
  };

  const addTimeSlot = (language, time) => {
    setLanguagesWithTimeSlots((prevSlots) => ({
      ...prevSlots,
      [language]: [...(prevSlots[language] || []), time],
    }));
  };

  const removeTimeSlot = (language, index) => {
    setLanguagesWithTimeSlots((prevSlots) => ({
      ...prevSlots,
      [language]: prevSlots[language].filter((_, i) => i !== index),
    }));
  };

  const handleSelectChange = (language) => {
    setSelectedLanguages((current) => {
      const isSelected = current.includes(language);
      if (isSelected) {
        return current.filter((lang) => lang !== language);
      } else {
        return [...current, language];
      }
    });

    setLanguagesWithTimeSlots((prevSlots) => {
      if (prevSlots[language]) {
        const { [language]: _, ...rest } = prevSlots;
        return rest;
      }
      return { ...prevSlots, [language]: prevSlots[language] || [""] };
    });
  };

  const toggleMonth = (monthIndex) => {
    setActiveMonths((current) =>
      current.map((month, index) => (index === monthIndex ? !month : month))
    );
  };

  const toggleDay = (dayIndex) => {
    setActiveDays((current) =>
      current.map((day, index) => (index === dayIndex ? !day : day))
    );
  };

  const handleAvailabilityChange = (e) => {
    const selectedOption = e.target.value;
    setAvailabilityOption(selectedOption);

    // Resetting other relevant states based on the chosen option
    switch (selectedOption) {
      case "Full Year":
        setActiveMonths(new Array(12).fill(true));
        setStartDate("");
        setEndDate("");
        break;
      case "Monthly":
        // If currently full year, reset to no months selected
        setActiveMonths(
          activeMonths.every(Boolean)
            ? new Array(12).fill(false)
            : [...activeMonths]
        );
        setStartDate("");
        setEndDate("");
        break;
      case "Date Range":
        setActiveMonths(new Array(12).fill(false));
        // Optionally, you might want to reset start and end dates here as well
        break;
      default:
        // Handle default case if necessary
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tour Name
        </label>
        <input
          type="text"
          name="name"
          value={tourFormData.name}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Duration Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Duration
        </label>
        <input
          type="text"
          name="duration"
          value={tourFormData.duration}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Availability Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Availability
        </label>
        <select
          value={availabilityOption}
          onChange={handleAvailabilityChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Full Year">Full Year</option>
          <option value="Monthly">Monthly</option>
          <option value="Date Range">Date Range</option>
        </select>
      </div>

      {/* Date Range Inputs */}
      {availabilityOption === "Date Range" && (
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-4 md:mb-0 md:mr-2 w-full">
            <label
              htmlFor="startDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <label
              htmlFor="endDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
        </div>
      )}

      {/* Month Grid */}
      {availabilityOption === "Monthly" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 mb-4">
          {monthNames.map((month, index) => (
            <button
              key={index}
              type="button"
              className={`p-2 m-1 text-center ${
                activeMonths[index] ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => toggleMonth(index)}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {/* Day Grid */}
      <h3 className="mt-4 text-gray-700 text-sm font-bold">Active Days</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-4">
        {dayNames.map((day, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 m-1 text-center whitespace-normal ${
              activeDays[index] ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => toggleDay(index)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Languages Offered Input */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Languages Offered
        </label>

        <div className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
          {["English", "Spanish", "French", "German"].map((language) => (
            <div
              key={language}
              className={`p-2 m-1 cursor-pointer ${
                selectedLanguages.includes(language)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectChange(language)}
            >
              {language}
            </div>
          ))}
        </div>
        </div>




{/* Time Slots Section */}
<div className="border p-4 rounded my-4">
  <h3 className="font-bold text-lg mb-2">Time Slots</h3>
  {selectedLanguages.map((language) => (
    <div key={language} className="mb-6">
      <h4 className="text-md font-semibold mb-2">{language} Time Slots:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {languagesWithTimeSlots[language]?.map((time, index) => (
          <div key={`${language}-${index}`} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(language, index, e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={() => removeTimeSlot(language, index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="sm:col-span-2 md:col-span-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={() => addTimeSlot(language, "")}
          >
            Add Time Slot
          </button>
        </div>
      </div>
    </div>
  ))}
</div>






      <div className="mb-4">
        <label className=" block text-gray-700 text-sm font-bold mb-2">
          Meeting Point Address
        </label>
        <input
          type="text"
          name="meetingAddress"
          value={tourFormData.meetingAddress}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Google Maps Link
        </label>
        <input
          type="text"
          name="googleMapsLink"
          value={tourFormData.googleMapsLink || ""}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Additional Meeting Info
        </label>
        <textarea
          name="additionalMeetingInfo"
          value={tourFormData.additionalMeetingInfo || ""}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <label
        htmlFor="tourImages"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Tour Images
      </label>
      <input
        type="file"
        id="tourImages"
        name="tourImages"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Overview
        </label>
        <textarea
          name="overview"
          value={tourFormData.overview}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

{/* Itinerary Section */}
<div className="border p-4 rounded my-4">
  <h2 className="font-semibold text-lg mb-2">What To Expect - Itinerary</h2>
  {tourFormData.itinerary.map((point, index) => (
    <div key={index} className="flex flex-col sm:flex-row items-start mb-4">
      <input
        type="text"
        placeholder="Title"
        value={point.title}
        onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:flex-grow"
      />
      <textarea
        placeholder="Description"
        value={point.description}
        onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 sm:mb-0 w-full h-24 sm:h-auto overflow-y-scroll sm:flex-grow"
      />
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto md:ml-2"
        type="button"
        onClick={() => removeItineraryPoint(index)}
      >
        Remove
      </button>
    </div>
  ))}
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    type="button"
    onClick={addItineraryPoint}
  >
    Add Itinerary Point
  </button>
</div>


      {/* Submit Button */}

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isEditing ? "Update Tour" : "Add Tour"}
      </button>
    </form>
  );
}

export default AddTourForm;
