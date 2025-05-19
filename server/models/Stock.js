const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
