const { Router } = require("express");
const productController = require("../controllers/productController");
const products = Router();
const upload = require("../config/multer");

// Hanlde URLs
products.get("/", productController.getProducts);
products.get("/new", productController.getNewProductForm);
products.get("/:id/edit", productController.getEditProductForm);
products.get("/:id", productController.getProductById);
products.post("/new", upload.single("image"), productController.createProduct);
products.put("/:id", upload.single("image"), productController.updateProduct);
products.delete("/:id", productController.deleteProduct);

module.exports = products;
