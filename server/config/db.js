const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

exports.connectToDb = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Database connected Successfully.");
    })
    .catch(() => {
      console.log("Failed to connect.");
    });
};
