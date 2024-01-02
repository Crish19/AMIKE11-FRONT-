import React from 'react';
import { useNavigate } from 'react-router-dom';


function TourCard({ tour, onReadMore}) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking-mobile/${tour._id}`);
  };

  const imageUrl = tour.images[0];

  // Function to truncate text for mobile screens
  const truncateText = (text, charLimit) => {
    if (window.innerWidth < 768 && text.length > charLimit) {
      return `${text.substring(0, charLimit)}...`;
    }
    return text;
  };

  const truncatedOverview = truncateText(tour.overview, 150); // 150 characters for mobile

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-5 mx-2">
      <img src={imageUrl} alt={tour.name} className="w-full h-48 sm:h-64 object-cover object-center" />
      <div className="p-3">
        <h3 className="font-bold text-md sm:text-lg mb-2 break-words">{tour.name}</h3>
        <p className="text-gray-700 text-xs sm:text-sm break-words md:text-justify">
          {truncatedOverview}
        </p>
        <div className="flex justify-between mt-3">
          <button 
            className="bg-orange-500 text-white py-1 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded hover:bg-orange-600" 
            onClick={onReadMore}
          >
            Read More
          </button>
          <button 
        className="md:hidden bg-blue-500 text-white py-1 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded hover:bg-blue-600" 
            onClick={handleBookNow}
            >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
