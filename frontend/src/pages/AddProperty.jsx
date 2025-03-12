import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");   
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = { title, price, location, imageUrl };

    fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((err) => alert("Failed to add property"));
  };

  return (
    <Container maxWidth="sm" className="my-10">
      <Typography variant="h4" className="text-center mb-4">
        Add New Property
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Property
        </Button>
      </form>
    </Container>
  );
};

export default AddProperty;
