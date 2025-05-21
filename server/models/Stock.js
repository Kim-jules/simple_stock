const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

stockSchema.index({ "products.product": 1, location: 1 }, { unique: false });

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
