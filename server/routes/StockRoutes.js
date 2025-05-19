const express = require("express");
const router = express.Router();
const stockController = require("../controllers/StockController");

router.post("/create", stockController.createStock);
// router.get("/", stockController.getAllstocks);
// router.get("/:id", stockController.getStockById);
// router.put("/update/:id", stockController.updateStocksById);
// router.delete("/delete/:id", stockController.deleteStocksById);

module.exports = router;
