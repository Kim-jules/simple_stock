const Stock = require("../models/Stock");
const Product = require("../models/Product");
const Location = require("../models/Location");

const createStock = async (req, res) => {
  const { location, products } = req.body;

  try {
    if (!location || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Location and products are required." });
    }

    // Validate location exists
    const locationExists = await Location.findById(location);
    if (!locationExists) {
      return res.status(404).json({ message: "Location not found." });
    }

    // Validate all products exist and quantities are valid
    for (const item of products) {
      if (
        !item.product ||
        typeof item.quantity !== "number" ||
        item.quantity < 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Each product must have a valid product ID and non-negative quantity.",
          });
      }
      const productExists = await Product.findById(item.product);
      if (!productExists) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }
    }

    const newStock = new Stock({
      location,
      products,
    });

    await newStock.save();
    res
      .status(201)
      .json({ message: "Stock created successfully.", stock: newStock });
  } catch (error) {
    console.error("Stock creation error:", error);
    res.status(500).json({ message: "Failed to create stock." });
  }
};

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("location")
      .populate("products.product");
    res.status(200).json({ message: "All stocks retrieved.", stocks });
  } catch (error) {
    console.error("Failed to retrieve stocks:", error);
    res.status(500).json({ message: "Failed to retrieve stocks." });
  }
};

const getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findById(id)
      .populate("location")
      .populate("products.product");
    if (!stock) {
      return res.status(404).json({ message: "Stock not found." });
    }
    res.status(200).json({ message: "Stock retrieved successfully.", stock });
  } catch (error) {
    console.error("Failed to retrieve stock:", error);
    res.status(500).json({ message: "Failed to retrieve stock." });
  }
};

const updateStockById = async (req, res) => {
  const { id } = req.params;
  const { location, products } = req.body;

  try {
    // Validate location if provided
    if (location) {
      const locationExists = await Location.findById(location);
      if (!locationExists) {
        return res.status(404).json({ message: "Location not found." });
      }
    }

    // Validate products if provided
    if (products) {
      if (!Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ message: "Products must be a non-empty array." });
      }
      for (const item of products) {
        if (
          !item.product ||
          typeof item.quantity !== "number" ||
          item.quantity < 0
        ) {
          return res
            .status(400)
            .json({
              message:
                "Each product must have a valid product ID and non-negative quantity.",
            });
        }
        const productExists = await Product.findById(item.product);
        if (!productExists) {
          return res
            .status(404)
            .json({ message: `Product not found: ${item.product}` });
        }
      }
    }

    const updateData = {};
    if (location) updateData.location = location;
    if (products) updateData.products = products;

    const updatedStock = await Stock.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("location")
      .populate("products.product");

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found." });
    }

    res
      .status(200)
      .json({ message: "Stock updated successfully.", stock: updatedStock });
  } catch (error) {
    console.error("Failed to update stock:", error);
    res.status(500).json({ message: "Failed to update stock." });
  }
};

const deleteStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found." });
    }
    res.status(200).json({ message: "Stock deleted successfully." });
  } catch (error) {
    console.error("Failed to delete stock:", error);
    res.status(500).json({ message: "Failed to delete stock." });
  }
};

module.exports = {
  createStock,
  getAllStocks,
  getStockById,
  updateStockById,
  deleteStockById,
};
