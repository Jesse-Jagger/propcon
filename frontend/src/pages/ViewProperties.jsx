import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const ViewProperties = () => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Available Properties
      </h1>

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

export default ViewProperties;
