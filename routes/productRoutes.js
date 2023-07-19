const express = require("express");
const router = express.Router();
// const Product = require("../models/productModel");
const ProductController = require("../controllers/productController");

/// add products detail
router.post("/", ProductController.add);

/// to get product data
router.get("/", ProductController.getAllProduct);

// to get a unique product by id

router.get("/:id", ProductController.getProductById);

/// update
router.put("/:id", ProductController.updateProduct);

//delete a product
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
