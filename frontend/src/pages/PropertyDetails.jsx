import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    console.log("Fetching property with id:", id);
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Property data fetched:", data);
        setProperty(data);
      })
      .catch((err) => {
        console.log("Error fetching property:", err);
        setProperty(null); 
      });
  }, [id]);

  return (
    <Container maxWidth="sm" className="my-10">
      {property ? (
        <>
          <Typography variant="h4" className="mb-4">{property.title}</Typography>
          <Typography variant="body1" className="mb-6">{property.description}</Typography>
          <Button variant="contained" color="secondary" onClick={() => alert("Seller has been notified.")}>
            Contact Seller
          </Button>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
};

export default PropertyDetails;
