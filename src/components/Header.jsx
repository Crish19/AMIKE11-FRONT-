import React from "react";
import logo from "../media/logo.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";
  const isHomePage = location.pathname === "/";

  const headerClasses = `p-4 md:p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between md:items-center md:flex-wrap ${
    isBookingPage ? "border-b-2 border-gray-500" : ""
  } ${isHomePage ? "bg-transparent" : "bg-orange-500"} z-10`;

  const logoTextClasses = `text-lg md:text-3xl font-bold ${
    isHomePage ? "text-orange-500" : "text-white"
  }`;

  const scrollToFooter = () => {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={headerClasses}>
      <div className="flex items-center mb-2 md:mb-0">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Amike logo"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <span className={logoTextClasses}>
            AmikeTours
          </span>
        </Link>
      </div>

      <div className={`hidden md:flex mt-2 md:mt-0 ml-2 md:ml-${isHomePage ? "16" : "20"} items-center justify-center`}>
        {isBookingPage && (
          <>
            <button
              onClick={scrollToFooter}
              className="text-white mr-4 focus:outline-none"
            >
              Contact
            </button>
            <Link
              to="/aboutus"
              className="text-white"
            >
              About
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
