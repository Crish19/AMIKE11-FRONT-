import React, { forwardRef, useState } from "react";

const ImageGallery = forwardRef(({ images }, ref) => {
  const [selectedPicIndex, setSelectedPicIndex] = useState(0);
  const api = 'http://localhost:3001'

  if (!images || images.length === 0) {
    return <div>No Images Available</div>;
  }

  const handlePrevClick = () => {
    setSelectedPicIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setSelectedPicIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div ref={ref} className="flex md:flex-row flex-col">
      {/* Thumbnails - hidden on mobile screens */}
      <div className="hidden md:flex flex-col mr-6">
        {images.map((image, index) => (
          <img
            key={index}
            src={`${api}/${image.startsWith("/") ? "" : "/"}${image}`}
            alt={`Tour view ${index + 1}`}
            className={`mb-2 rounded-2xl object-cover cursor-pointer ${
              selectedPicIndex === index ? "border-2 border-orange-500" : "opacity-60"
            }`}
            style={{ width: "150px", height: "101px" }}
            onClick={() => setSelectedPicIndex(index)}
          />
        ))}
      </div>

      {/* Main Image and Navigation Arrows */}
      <div className="relative flex-grow">
        <img
  src={`${api}/${images[selectedPicIndex].startsWith('/') ? '' : '/'}${images[selectedPicIndex]}`}
  alt={`Selected tour image`}
          className="w-full h-auto md:h-[78vh] object-cover rounded-2xl"
          style={{ aspectRatio: '4 / 3' }} // Consistent aspect ratio on all screens
        />
        {/* Arrows - visible on all screen sizes */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 m-2 rounded-full shadow-md z-10"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 m-2 rounded-full shadow-md z-10"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
});

export default ImageGallery;
