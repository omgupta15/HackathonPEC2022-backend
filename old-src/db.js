const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

module.exports = db;
