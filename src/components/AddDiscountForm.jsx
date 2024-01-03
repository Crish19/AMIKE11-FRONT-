// src/components/AddDiscountForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

function AddDiscountForm({discountData, onRefresh}) {
  const api = 'https://obscure-sierra-26039-89103941a3f4.herokuapp.com'
  const [images, setImages] = useState([]);
  const [discountFormData, setDiscountFormData] = useState(discountData || { name: '', description: '', imageUrl:'', websiteUrl:'', location:'' });
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    setImages(e.target.files[0]);
  };
  const handleChange = (e) => {
    setDiscountFormData({ ...discountFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    if (images) {
      formData.append('images', images);
    }
  
    for (const key in discountFormData) {
      formData.append(key, discountFormData[key]);
    }
  
    const method = discountData ? 'PUT' : 'POST';
    const url = discountData ? `${api}/api/discounts/${discountData._id}` : `/api/discounts`;
  
    try {
      const isEditing = !!discountData && !!discountData._id; // Check if editing an existing discount
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
  
      if (response.ok) {
        const message = isEditing ? 'Discount successfully updated!' : 'Discount successfully added!';
        alert(message);
        navigate('/admin'); 
      } else {
        alert("Failed to add the discount. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg" enctype="multipart/form-data">
      <div>
        <label>Name</label>
        <input
          name="name"
          value={discountFormData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={discountFormData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
      <label>Discount Images</label>
      <input
        type="file"
        id="discountImages"
        name="images"
        accept="image/*"
        onChange={handleImageChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
      <div>
        <label>Website</label>
        <input
          name="websiteUrl"
          value={discountFormData.websiteUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Location</label>
        <input
          name="location"
          value={discountFormData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        {discountData ? "Update" : "Save"}
      </button>

    </form>
  );
}

export default AddDiscountForm;
