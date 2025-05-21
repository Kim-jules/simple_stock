const Stock = require("../models/Stock");

const generateStockReport = async (req, res) => {
  try {
    const report = await Stock.aggregate([
      // Getting the location information
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location_info",
        },
      },

      // Converting the location info into object instead of array

      {
        $unwind: "$location_info",
      },

      //   Converting the products field from the stock collection to be able to work with each product.

      { $unwind: "$products" },

      // adding or combining the product information.
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product_info",
        },
      },

      //   Converting the product_info

      { $unwind: "$product_info" },

      // Then creating or projecting the structure of the output
      {
        $project: {
          stock_id: "$_id",
          location: {
            id: "$location_info._id",
            name: "$location_info.name",
            address: "$location_info.address",
          },
          product: {
            id: "$product_info._id",
            name: "$product_info.product_name",
            sku: "$product_info.sku",
            description: "$product_info.description",
            unit_price: "$product_info.unit_price",
          },
          quantity: "$products.quantity",
        },
      },

      // Grouping products
      {
        $group: {
          _id: "$stock_id",
          location: { $first: "$location" },
          products: {
            $push: {
              product: "$product",
              quantity: "$quantity",
            },
          },
        },
      },

      {
        $sort: {
          "location.name": 1,
        },
      },
    ]);

    return res.status(200).json(report);
  } catch (error) {
    console.error("Error generating a report", error);
    res.status(500).json({ error: "Failed to generate a report." });
  }
};

module.exports = generateStockReport;
