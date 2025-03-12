import React, { useState } from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const [contactMessage, setContactMessage] = useState("");

  const handleContactSeller = () => {
    setContactMessage("Seller has been notified.");
  };

  if (!property) {
    return <p>No property data available.</p>;
  }

  const { id, title = "Untitled", price = "N/A", location = "Unknown", imageUrl = "" } = property;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrl || "https://via.placeholder.com/300x200"}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{location}</p>
      <p className="text-lg font-bold text-blue-500">${price}</p>

      <div className="mt-4 flex space-x-4">
        <Link to={`/property/${id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded">View Details</button>
        </Link>

        <button 
          onClick={handleContactSeller} 
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Contact Seller
        </button>
      </div>

      {contactMessage && (
        <p className="mt-2 text-green-600">{contactMessage}</p>
      )}
    </div>
  );
};

export default PropertyCard;
