import React from 'react';
import logo from '../media/logo.png';

function AboutUs() {
  return (
    <div className="mx-auto">
      <section className="hero-section bg-gradient-to-r from-orange-500 to-orange-300 py-10 md:py-20 flex flex-col items-center">
        <img src={logo} alt="Amike Tours Logo" className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Amike Tours: Where stories walk with you</h1>
        <p className="text-lg md:text-xl text-white text-center mb-4">Explore Stockholm's authentic charm with locals and expats!</p>
        <a href="/booking" className="inline-block bg-white text-orange-500 text-sm md:text-base px-3 md:px-4 py-1 md:py-2 rounded shadow-md hover:bg-gray-100 mb-4">Preview our Tours</a>
        <div className="p-4 md:p-6 rounded-lg max-w-xl mx-auto text-justify">
        <section className="about-section text-gray-700 leading-relaxed text-base md:text-lg font-serif">
            <p>At Amike Tours, it's not just about the journey but the stories we share along the way. Founded by Cristhian and Jorge, two expats with a deep affection for Stockholm, our tours are more than mere walks; they're an exploration of stories and laughter. We bring a unique dual perspective — as locals and expatriates — to show you the authentic and diverse sides of this beautiful city. Our aim is to connect with travelers, share intriguing histories, crack jokes, and above all, ensure that you have a fantastic time. Join us on a walk through Stockholm, where every street has a story, and every tour leaves you with unforgettable memories.</p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
