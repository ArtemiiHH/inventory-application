const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categories = Router();

// Hanlde URLs
categories.get("/", categoryController.getCategories);
categories.get("/new", categoryController.getNewCategoryForm);
categories.get("/:id", categoryController.getCategoryById);
categories.post("/new", categoryController.createCategory);
categories.put("/:id", categoryController.updateCategory);
categories.delete("/:id", categoryController.deleteCategory);

module.exports = categories;
