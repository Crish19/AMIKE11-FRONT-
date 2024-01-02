function TourTicket({
  selectedTourName,
  selectedDate,
  selectedTime, // This is a string like "15:00"
  selectedLanguages,
  adultsCount,
  infantsCount,
}) {
  // Function to check if a value is a Date object
  const isDateObject = (date) => date instanceof Date && !isNaN(date);

  // Format Date
  const formattedDate = isDateObject(selectedDate) ? selectedDate.toLocaleDateString() : 'No date selected';

  
  return (
    <div className="rounded-xl mt-4" style={{ background: "#f8f8f8", maxWidth: '350px' }}>
      <div className="bg-orange-500 text-white text-center py-1 rounded-t-xl">
        <h2 className="font-bold text-sm md:text-base">Your Tour Ticket</h2>
      </div>
      <div className="p-3 text-xs md:text-sm">
        <p className="font-semibold">{selectedTourName}</p>
        <div className="flex justify-between mt-4">
          <div>
            <p>Date:</p>
            <p className="font-semibold">{formattedDate}</p>
          </div>
          <div>
            <p>Time:</p>
            <p className="font-semibold">{selectedTime || "No time selected"}</p>
          </div>
        </div>
        <div className="mt-4">
          <p>Languages:</p>
          <p className="font-semibold">
            {selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "None selected"}
          </p>
        </div>
        <div className="mt-4">
          <p>Total Travelers:</p>
          <p className="font-semibold">Adults {adultsCount}</p>
          <p className="font-semibold">Infants {infantsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default TourTicket;
