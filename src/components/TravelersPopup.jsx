import React from "react";

function TravelersPopup({
  showPopup,
  setShowPopup, 
  adultsCount,
  infantsCount,
  decrementCount,
  incrementCount,
  handleAccept,
}) {
  return (
    <div className="relative ">
      <div
        onClick={() => setShowPopup(true)}
        className="border  border-gray-300  flex items-center justify-center cursor-pointer md:w-20 p-2 rounded-xl text-xs md:text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
        {/* Travelers icon */}
        <span className="ml-2 text-l font-semibold">
          {adultsCount + infantsCount}
        </span>
      </div>
      {showPopup && (
        <div className="absolute bottom-[-499%] left-0 p-4 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold">Travelers</div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="mr-2">Adults:</div>
              <button
                onClick={() => decrementCount("adults")}
                className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-2"
              >
                -
              </button>
              <span className="text-xl font-semibold mr-2">{adultsCount}</span>
              <button
                onClick={() => incrementCount("adults")}
                className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center "
              >
                +
              </button>
            </div>
            <div className="flex items-center">
              <div className="mr-1.5">Infants:</div>
              <button
                onClick={() => decrementCount("infants")}
                className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-2 "
              >
                -
              </button>
              <span className="text-xl font-semibold mr-2">{infantsCount}</span>
              <button
                onClick={() => incrementCount("infants")}
                className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAccept}
            className="bg-orange-500 text-white py-2 px-4 rounded-md w-full"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

export default TravelersPopup;
