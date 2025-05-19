const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/create", productController.insertProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProductById);

module.exports = router;
