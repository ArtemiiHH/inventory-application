const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categories = Router();

// Hanlde URLs
categories.get("/", categoryController.getCategories);
categories.get("/new", categoryController.getNewCategoryForm);
categories.get("/:id", categoryController.getCategoryById);
categories.post("/new", categoryController.createCategory);
categories.put("/:id/edit", categoryController.updateCategory);
categories.delete("/:id/delete", categoryController.deleteCategory);

module.exports = categories;
