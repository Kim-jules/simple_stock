const Product = require("../models/Product");

const insertProduct = async (req, res) => {
  const { product_name, quantity, unit_price } = req.body;

  try {
    if (!product_name || !quantity || !unit_price) {
      return res
        .status(400)
        .json({ message: "Full Product information required." });
    }
    const newProduct = new Product({
      product_name,
      quantity,
      unit_price,
    });

    await newProduct.save();
    res.status(200).json({ message: "Product saved successfully." });
  } catch (error) {
    console.error("Product creation error: ", error);
    res.status(500).json({ message: "Failed to add product." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res
      .status(200)
      .json({ message: "These are all the products.", products: allProducts });
  } catch (error) {
    console.error("Failed to retrieve", error);
    res.status(500).json({ message: "Failed to retrieve the products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found." });
    }
    res
      .status(200)
      .json({ message: "Product saved successfully", data: product });
  } catch (error) {
    console.error("Failed to retrieve product.", error);
    res.status(500).json({ message: "Failed to retrieve product." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, quantity, unit_price } = req.body;

  try {
    const existingProduct = await Product.findById({ _id: id });
    if (!existingProduct) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found." });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        product_name: product_name,
        quantity: quantity,
        unit_price: unit_price,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully.",
      new_product: updatedProduct,
    });
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ message: "Failed to update." });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await Product.findById({ _id: id });
    if (!existingProduct) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Failed to delete product", error);
    return res.status(500).json({ message: "Failed to delete product." });
  }
};

module.exports = {
  insertProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
};
