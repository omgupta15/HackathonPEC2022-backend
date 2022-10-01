const mongoose = require("mongoose");
const config = require("server-config");

const mongoUri = `mongodb://localhost:27017/${config.DATABASE_NAME}`;
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

module.exports = db;
