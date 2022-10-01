"use strict";

var mongoose = require("mongoose");

var config = require("./server-config");

var mongoUri = "mongodb://localhost:27017/".concat(config.DATABASE_NAME);
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Successfully connected to MongoDB");
});
module.exports = db;