import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function CancellationConfirmation() {
  return (
    <div className="container mx-auto my-10 p-5">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Booking Cancelled</h1>
        <p className="text-gray-600 mb-4">Your booking has been successfully cancelled. We're sorry to see you go!</p>
        <p className="text-gray-600">If you have any questions or need assistance, please don't hesitate to <Link to="/contact" className="text-blue-500 hover:underline">contact us</Link>.</p>
        <div className="mt-6">
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CancellationConfirmation;
