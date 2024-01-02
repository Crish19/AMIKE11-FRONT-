import React, { useEffect, useState, useRef } from "react";
import ImageGallery from "../components/ImageGallery";
import InfoContainer from "../components/InfoContainer";
import BookingWidget from "../components/BookingWidget";
import Header from "../components/Header";
import TourCard from "../components/TourCard";
import DiscountCard from "../components/DiscountCard";
import Footer from "../components/Footer";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function BookingPage() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const imageGalleryRef = useRef(null);
  const [discounts, setDiscounts] = useState([]); // State to store discounts
  const [activeTab, setActiveTab] = useState("tour"); // State to track the active tab

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tour`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  // useEffect to fetch discounts
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/discounts`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDiscounts(data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {
    if (selectedTour && imageGalleryRef.current) {
      const galleryPosition = imageGalleryRef.current.offsetTop;
      window.scrollTo(0, galleryPosition - 100);
    }
  }, [selectedTour]);

  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
  };

  const renderTourDetails = (tour) => {
    return (
      <div>
        <h2 className="font-bold text-lg md:text-2xl mb-5">{tour.name}</h2>
        <span></span>
        <ImageGallery ref={imageGalleryRef} images={selectedTour.images} />
        <div className=" border-t border-gray-300 my-4 "></div>{" "}
        <div className="flex m-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-Width="1.5"
            stroke="orange"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-xs md:text-sm mr-10">{tour.duration}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-Width="1.5"
            stroke="orange"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          <p className="text-xs">
            Offered in: {tour.languagesOffered.join(",")}
          </p>
        </div>
        <div className=" border-t border-gray-300 my-4 "></div>{" "}
        <InfoContainer tour={selectedTour} />
        <button
          onClick={() => setSelectedTour(null)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full text-center mt-4 md:w-auto md:mt-0 mb-3"
          >
          Back to Tours
        </button>
      </div>
    );
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Header />

      {/* Content Based on Active Tab */}
      <div className="md:flex md:my-5 mt-3 booking-page">
        <div className="w-full px-4 md:flex-grow md:max-w-[70%] md:pr-6 md:mt-5 md:ml-3 md:p-3">
          <div className=" flex justify-center mb-4">
            <button
              onClick={() => setActiveTab("tour")}
              className={`mx-1 px-4 py-2 text-sm font-medium text-gray-600 ${
                activeTab === "tour"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Tours
            </button>
            <button
              onClick={() => setActiveTab("discount")}
              className={`mx-1 px-4 py-2 text-sm font-medium text-gray-600 ${
                activeTab === "discount"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Discounts
            </button>
          </div>

          {activeTab === "tour" &&
            (selectedTour ? (
              renderTourDetails(selectedTour)
            ) : isMobile ? (
              <Swiper
                className="custom-swiper-button"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {tours.map((tour) => (
                  <SwiperSlide key={tour._id} className=" mb-2">
                    <TourCard
                      key={tour._id}
                      tour={tour}
                      onReadMore={() => handleTourSelect(tour)}
                      imageUrl={
                        tour.images && tour.images.length > 0
                          ? tour.images[0]
                          : "default-placeholder-image-url"
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              tours.map((tour) => (
                <TourCard
                  key={tour._id}
                  tour={tour}
                  onReadMore={() => handleTourSelect(tour)}
                  imageUrl={
                    tour.images && tour.images.length > 0
                      ? tour.images[0]
                      : "default-placeholder-image-url"
                  }
                />
              ))
            ))}

{activeTab === "discount" &&
  (isMobile ? (
    // Swiper for Discounts on Mobile
    <Swiper
      className="custom-swiper-button"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {discounts.map((discount) => (
        <SwiperSlide key={discount._id} className=" mb-2">
          <DiscountCard
            key={discount._id}
            discount={discount}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    // Regular list for Discounts on Desktop
    discounts.map((discount) => (
      <DiscountCard
        key={discount._id}
        discount={discount}
      />
    ))
  ))
}
        </div>

        <div className="md:flex-shrink-0 md:max-w-[30%] sticky top-[desired-limit] right-4">
          <BookingWidget />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookingPage;
