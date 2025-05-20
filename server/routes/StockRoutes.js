const express = require("express");
const router = express.Router();
const stockController = require("../controllers/StockController");

router.post("/create", stockController.createStock);
router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.put("/update/:id", stockController.updateStockById);
// router.delete("/delete/:id", stockController.deleteStocksById);

module.exports = router;
