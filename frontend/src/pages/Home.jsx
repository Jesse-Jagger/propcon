import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        return res.json();
      })
      .then((data) => setProperties(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-6 bg-black min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center my-10">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text hover:from-purple-600 hover:to-blue-600 transition-all duration-500 shadow-lg">
          Welcome to Property Connect
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Find your dream property or list your own for sale!
        </p>
        <div className="flex space-x-4">
          <Link to="/properties">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Properties
            </button>
          </Link>
          <Link to="/add-property">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add Property
            </button>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Available Properties</h2>

      {loading && <p className="text-center text-gray-500">Loading properties...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <p className="text-center text-gray-500">No properties available.</p>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;