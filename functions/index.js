
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { calculateSaju } = require("./services/sajuService");

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json()); // Add this middleware to parse JSON request bodies

// Define a simple test route
app.get("/", (req, res) => {
  res.status(200).send("Hello from Firebase!");
});

// Define the /calculate route
app.post("/calculate", (req, res) => {
  try {
    const { year, month, day, hour } = req.body;

    // Basic validation
    if (!year || !month || !day || !hour) {
      return res.status(400).json({ error: "Missing required fields: year, month, day, hour" });
    }

    // Call the service to calculate saju
    const sajuResult = calculateSaju(parseInt(year), parseInt(month), parseInt(day), parseInt(hour));

    // Send the result back to the client
    res.status(200).json(sajuResult);

  } catch (error) {
    console.error("Error in /calculate route:", error);
    res.status(500).json({ error: "An internal error occurred." });
  }
});

// Expose Express API as a single Cloud Function
exports.api = functions.https.onRequest(app);
