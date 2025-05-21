const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: String,
  },
  { timestamps: true }
);

const locationModel = mongoose.model("Location", locationSchema);
module.exports = locationModel;
