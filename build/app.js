"use strict";

require("dotenv").config(); // Firebase Admin Setup


var firebase = require("firebase-admin");

var firebaseKey = require("./keys/firebase.json");

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseKey)
}); // MongoDB

require("./db"); // Express Server


var express = require("express");

var cors = require("cors");

var logger = require("morgan");

var cookieParser = require("cookie-parser");

var app = express(); // Middlewares

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser()); // Routes

app.use("/", require("./routes"));
var PORT = 3000;
app.listen(PORT, function (err) {
  if (err) {
    console.log("Error while starting express server:", err);
    return;
  }

  console.log("Server is listening on port: ".concat(PORT));
});