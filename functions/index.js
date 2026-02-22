
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Define a simple test route
app.get("/", (req, res) => {
  res.status(200).send("Hello from Firebase!");
});

// Expose Express API as a single Cloud Function
exports.api = functions.https.onRequest(app);
