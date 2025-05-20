const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

stockSchema.index({ product: 1, location: 1 }, { unique: true });

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
