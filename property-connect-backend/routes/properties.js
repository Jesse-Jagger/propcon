const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const propertiesFile = path.join(__dirname, "../data/properties.json");

// Ensure the file exists and initialize it if not
if (!fs.existsSync(propertiesFile)) {
    fs.writeFileSync(propertiesFile, "[]", "utf8");
}

// Route: POST - Add new property
router.post("/", (req, res) => {
    const { title, price, location, imageUrl } = req.body;

    if (!title || !price || !location) {
        return res.status(400).json({ error: "Title, price, and location are required" });
    }

    let properties = JSON.parse(fs.readFileSync(propertiesFile, "utf8"));

    const newProperty = {
        id: properties.length + 1, // Can be improved if you want unique IDs
        title,
        price: parseFloat(price),
        location,
        imageUrl: imageUrl || "default.jpg",
        createdAt: new Date().toISOString(),
    };

    properties.push(newProperty);
    fs.writeFileSync(propertiesFile, JSON.stringify(properties, null, 2), "utf8");

    res.status(201).json({ message: "Property listed successfully", data: newProperty });
});

// Route: GET - Get all properties
router.get("/", (req, res) => {
    try {
        const properties = JSON.parse(fs.readFileSync(propertiesFile, "utf8"));
        res.json(properties);
    } catch (error) {
        console.error("Error reading properties:", error);
        res.status(500).json({ error: "Failed to retrieve properties" });
    }
});

// Route: GET - Get property by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    try {
        const properties = JSON.parse(fs.readFileSync(propertiesFile, "utf8"));
        const property = properties.find((property) => property.id === parseInt(id));

        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        console.error("Error reading properties:", error);
        res.status(500).json({ error: "Failed to retrieve property" });
    }
});

module.exports = router;
