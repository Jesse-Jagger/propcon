const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const propertyRoutes = require("./routes/properties");
const contactRoutes = require("./routes/contact");
app.use("/api/properties", propertyRoutes);
app.use("/api/contact-seller", contactRoutes);

console.log("Registered Routes:");
app._router.stack.forEach((r) => {
    if (r.route) {
        console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
