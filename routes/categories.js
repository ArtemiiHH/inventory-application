const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categories = Router();

// Hanlde URLs
categories.get("/category", categoryController.getCategories);
categories.get("/category/:id", categoryController.getCategoryById);
categories.post("/category/create", categoryController.createCategory);
categories.put("/category/:id/edit", categoryController.updateCategory);
categories.delete("/category/:id/delete", categoryController.deleteCategory);

module.exports = categories;
