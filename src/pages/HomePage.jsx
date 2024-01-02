import React from "react";
import backgroundImage from "../media/stad1.jpg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white content">
        <div className="container mx-auto p-4 md:p-8 text-center mt-16 md:mt-0">
          <h1 className="text-2xl md:text-4xl font-bold main-title ">
            Welcome to AMIKE Tours
          </h1>
          <p className="text-base md:text-xl mb-2 md:mb-6 main-text">
            Explore Stockholm with our free walking tours <br />
            <strong>Hablamos Español.</strong>
          </p>
          <Link
            to="booking"
            className="bg-orange-500 hover:bg-orange-600 text-white py-1 md:py-2 px-4 md:px-6 rounded-full font-bold text-base md:text-lg book-now-button"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
