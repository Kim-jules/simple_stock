const express = require("express");
const router = express.Router();
const stockController = require("../controllers/StockController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/create",
  authMiddleware.requireAdminPermission,
  stockController.createStock
);
router.get("/", authMiddleware.requireLogin, stockController.getAllStocks);
router.get("/:id", authMiddleware.requireLogin, stockController.getStockById);
router.put(
  "/update/:id",
  authMiddleware.requireAdminPermission,
  stockController.updateStockById
);
router.delete(
  "/delete/:id",
  authMiddleware.requireAdminPermission,
  stockController.deleteStockById
);

module.exports = router;
