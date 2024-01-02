import React from "react";
import {  } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer" className="bg-orange-500 p-3 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-lg md:text-2xl font-bold mb-2">Exploring the city, one step at a time.</h2>

        {/* Email and About Link */}
        <div className="flex flex-col items-center md:flex-row justify-center mb-2">
          <a href="mailto:amiketours@gmail.com" className="text-sm md:text-lg hover:text-orange-300 mb-2 md:mb-0 md:mr-4">
            amiketours@gmail.com
          </a>
         
        </div>

        {/* WhatsApp */}
        <div className="text-sm mb-2">
          <p>WhatsApp:</p>
          <a href="tel:+46729406310" className="hover:text-orange-300">
            +46 729 406 310
          </a>
          <span className="mx-1">|</span>
          <a href="tel:+46761426946" className="hover:text-orange-300">
            +46 761 426 946
          </a>
        </div>

        {/* Instagram */}
        <div className="mb-2">
          <a href="https://www.instagram.com/amiketours/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg hover:text-orange-300">
            Follow us on Instagram
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs mt-2">
          © {new Date().getFullYear()} AmikeTours. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
