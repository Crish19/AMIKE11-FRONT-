// AdminDiscountList.js
import React, { useEffect, useState } from "react";

function AdminDiscountList({ setActiveTab, setSelectedDiscount }) {
  const [discounts, setDiscounts] = useState([]);
  const api = 'https://obscure-sierra-26039-89103941a3f4.herokuapp.com'

  // Function to fetch discounts
  const fetchDiscounts = async () => {
    try {
      const response = await fetch(`${api}/api/discounts`); // Use the environment variable
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`${api}/api/discounts/${id}`, { // Use the environment variable
      method: "DELETE",
    });

    if (response.ok) {
      fetchDiscounts(); // Refresh the list of discounts
    } else {
      console.error("Failed to delete discount");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-3">Discount List</h2>
      <button
        onClick={() => {
          setSelectedDiscount(null);
          setActiveTab("addDiscount");
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded mb-3"
      >
        Add New Discount
      </button>

      <ul>
        {discounts.map((discount) => (
          <li key={discount._id} className="border-b border-gray-200 py-2">
            {" "}
            {/* Use _id for the key */}
            <div className="flex justify-between items-center">
              <div className=" flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base">{discount.name}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={() => {
                    setSelectedDiscount(discount);
                    setActiveTab("addDiscount");
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-1 sm:px-3 rounded mx-1 text-xs sm:text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(discount._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 sm:py-1 sm:px-3 rounded text-xs sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDiscountList;
