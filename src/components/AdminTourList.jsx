// src/components/AdminTourList.js
import React, { useEffect, useState } from "react";

function AdminTourList({ setActiveTab, setSelectedTour }) {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/tours`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/tours/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchTours(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };
  

  const handleEdit = (tour) => {
    console.log('Editing tour:', tour)
    setSelectedTour(tour);
    setActiveTab("addTour");
  };

  const handleAddNewTour = () => {
    setSelectedTour(null); 
    setActiveTab("addTour");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-3">Tour List</h2>
      <button
        onClick= {handleAddNewTour }
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-sm rounded mb-3"
        >
        Add New Tour
      </button>

      <ul>
        {tours.map((tour) => (
          <li key={tour._id} className="border-b border-gray-200 py-2">
            
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm break-words" >{tour.name}</p>
                <p className="text-gray-600 text-xs break-words" >{tour.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">


                <button
                  onClick={() => handleEdit(tour)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded"
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

export default AdminTourList;
