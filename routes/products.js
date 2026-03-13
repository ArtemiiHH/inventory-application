const { Router } = require("express");
const productController = require("../controllers/productController");
const products = Router();

// Hanlde URLs
products.get("/", productController.getProducts);
products.get("/new", productController.getNewProductForm);
products.get("/:id", productController.getProductById);
products.post("/new", productController.createProduct);
products.put("/:id/edit", productController.updateProduct);
products.delete("/:id/delete", productController.deleteProduct);

module.exports = products;
