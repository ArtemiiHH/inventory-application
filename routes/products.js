const { Router } = require("express");
const productController = require("../controllers/productController");
const products = Router();

// Hanlde URLs
products.get("/products", productController.getProducts);
products.get("/products/:id", productController.getProductById);
products.post("/products/create", productController.createProduct);
products.put("/products/:id/edit", productController.updateProduct);
products.delete("/products/:id/delete", productController.deleteProduct);

module.exports = products;
