require("dotenv").config();

// Firebase Admin Setup
const firebase = require("firebase-admin");
const firebaseKey = require("keys/firebase.json");

firebase.initializeApp({ credential: firebase.credential.cert(firebaseKey) });

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

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error while starting express server:", err);
    return;
  }

  console.log(`Server is listening on port: ${PORT}`);
});
