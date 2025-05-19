const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    unit_price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
