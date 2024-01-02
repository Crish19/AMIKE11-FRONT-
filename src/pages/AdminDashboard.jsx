// src/pages/AdminDashboard.js
import React, { useContext, useState } from "react";
import AdminTourList from "../components/AdminTourList";
import AddTourForm from "../components/AddTourForm";
import AdminDiscountList from "../components/AdminDiscountList";
import AddDiscountForm from "../components/AddDiscountForm";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PublishedBookings from "../components/PublishedBookings";


function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("tourList");
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();




  const resetSelectedTour = () => {
    setSelectedTour(null);
  };

  const handleSaveDiscount = async (discountData, isEditing) => {
    const apiUrl = process.env.REACT_APP_API_URL; // Get the API URL from environment variable

    const url = isEditing ? `${apiUrl}/api/discounts/${discountData._id}` : `${apiUrl}/api/discounts`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discountData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Discount saved successfully");
      refreshDiscounts(); 
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };
  const refreshDiscounts = async () => {
    // Fetch discounts and update state
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'addTour') {
      resetSelectedTour(null); // Reset selected tour when switching to 'addTour'
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    setAuthData(null); 
    navigate('/admin-login'); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
     <header className="bg-orange-600 text-white py-2 px-4 flex justify-between items-center">
  <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">AMIKE Admin Dashboard</h1>
  <button className="py-1 px-3 bg-blue-500 text-white rounded-lg text-xs sm:text-sm md:text-base" onClick={handleLogout}>
    Logout
  </button>
</header>
      <nav className="bg-white shadow py-2">
      <div className="container mx-auto flex flex-wrap justify-center space-x-2 md:space-x-4">
          <button
            onClick={() => handleTabChange("tourList")}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ... ${
              activeTab === "tourList"
                ? "bg-orange-500 text-white"
                : "text-blue-500"
            }`}
          >
            Manage Tours
          </button>

          <button
            onClick={() => setActiveTab("publishedbookings")}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ... ${
              activeTab === "publishedbookings"
                ? "bg-orange-500 text-white"
                : "text-blue-500"
            }`}
          >
            Published Bookings
          </button>
          <button
            onClick={() => setActiveTab("discountList")}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ... ${
              activeTab === "discountList"
                ? "bg-orange-500 text-white"
                : "text-blue-500"
            }`}
          >
            Manage Discounts
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {activeTab === "tourList" && (
            <AdminTourList setActiveTab={setActiveTab} setSelectedTour={setSelectedTour} /* Other props */ />
            )}
        {activeTab === "addTour" && <AddTourForm tourData={selectedTour} />}
        {activeTab === "discountList" && (
          <AdminDiscountList setActiveTab={setActiveTab}  setSelectedDiscount={setSelectedDiscount} />
        )}
        {activeTab === "addDiscount" && (
          <AddDiscountForm
          discountData={selectedDiscount}
          onSave={(data) => handleSaveDiscount(data, !!selectedDiscount)}
          onRefresh={refreshDiscounts}
        />
        )}
        {activeTab === "publishedbookings" && (
          <div>
             <div>
            <h2 className="text-2xl font-bold mb-4">Published Tours</h2>
            <PublishedBookings  onSelect={setSelectedTour} />
          </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default AdminDashboard;
