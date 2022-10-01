require("dotenv").config();

// Firebase Admin Setup
const firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: "service_account",
    project_id: "hackathonpec-2022-backend",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pq381%40hackathonpec-2022-backend.iam.gserviceaccount.com",
  }),
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
