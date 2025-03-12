const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");
const propertyRoutes = require("./routes/properties");

const app = express();
app.use(express.json());
app.use("/api/properties", propertyRoutes);

const propertiesFile = path.join(__dirname, "data/properties.json");

if (!fs.existsSync(propertiesFile)) {
    fs.writeFileSync(propertiesFile, "[]", "utf8");
}
describe("Property API Tests", () => {
    
    it("should get all properties", async () => {
        const res = await request(app).get("/api/properties");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should get a property by ID", async () => {
        const property = {
            id: 1,
            title: "4 bedroom Duplex",
            price: 200000,
            location: "Atico",
            imageUrl: "Duplex.jpg"
        };

        let properties = JSON.parse(fs.readFileSync(propertiesFile, "utf8"));
        properties.push(property);
        fs.writeFileSync(propertiesFile, JSON.stringify(properties, null, 2), "utf8");

        const res = await request(app).get(`/api/properties/${property.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(property.title);
        expect(res.body.price).toBe(property.price);
        expect(res.body.location).toBe(property.location);
    });

    it("should return 404 if property not found", async () => {
        const res = await request(app).get("/api/properties/999");

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Property not found");
    });

    it("should create a new property", async () => {
        const newProperty = {
            title: "New 3 bedroom House",
            price: 300000,
            location: "Suburb",
            imageUrl: "House.jpg"
        };

        const res = await request(app)
            .post("/api/properties")
            .send(newProperty)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Property listed successfully");
        expect(res.body.data.title).toBe(newProperty.title);
        expect(res.body.data.price).toBe(newProperty.price);
        expect(res.body.data.location).toBe(newProperty.location);
    });

    it("should return an error if missing required fields", async () => {
        const incompleteProperty = {
            title: "Incomplete Property"
        };

        const res = await request(app)
            .post("/api/properties")
            .send(incompleteProperty)
            .set("Content-Type", "application/json");

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Title, price, and location are required");
    });
});
