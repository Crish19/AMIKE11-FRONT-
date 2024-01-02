import React from 'react';

function DiscountCard({ discount }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-5 mx-2">
      {/* Image */}
      <img src={discount.imageUrl} alt={discount.name} className="w-full h-48 sm:h-64 object-cover object-center" />
      
      <div className="p-3">
        {/* Name */}
        <h3 className="font-bold text-md sm:text-lg mb-2 break-words">{discount.name}</h3>
        
        {/* Description */}
        <p className="text-gray-700 text-xs sm:text-sm break-words md:text-justify">
          {discount.description && discount.description.length > 100 ? `${discount.description.substring(0, 150)}...` : discount.description}
        </p>

        {/* Additional Info */}
        <div className="text-xs sm:text-sm mb-3 text-orange-500">
          {/* Validity */}
          <p>Valid for: 24 hours from the time of issue</p>
          {/* Redemption Instructions */}
          <p>Redemption: Ask your tour guide for instructions</p>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center mt-3">
          {/* Link to website */}
          <a href={discount.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm">
            Visit Website
          </a>

          {/* Google Maps Link */}
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(discount.location)}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm">
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
}

export default DiscountCard;
