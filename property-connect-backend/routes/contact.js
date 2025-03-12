const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const messagesFile = path.join(__dirname, "../data/messages.json");

// Ensure the messages file exists
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, "[]", "utf8");
}

router.post("/", (req, res) => {
    const { propertyId, buyerName, buyerMessage } = req.body;

    if (!propertyId || !buyerName || !buyerMessage) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Read existing messages
    let messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));

    // Create new message object
    const newMessage = {
        id: messages.length + 1,
        propertyId,
        buyerName,
        buyerMessage,
        timestamp: new Date().toISOString(),
    };

    // Append the new message and save
    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), "utf8");

    res.status(201).json({ message: "Seller has been notified", data: newMessage });
});

// Fetch all messages (for testing)
router.get("/", (req, res) => {
    const messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
    res.json(messages);
});

module.exports = router;
