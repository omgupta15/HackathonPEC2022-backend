require("dotenv").config();

// Firebase Admin Setup
const firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.FIREBASE_KEYS)),
});

// MongoDB
require("db");

// Express Server
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", require("routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error while starting express server:", err);
    return;
  }

  console.log(`Server is listening on port: ${PORT}`);
});
