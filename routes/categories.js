const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categories = Router();

// Hanlde URLs
categories.get("/", categoryController.getCategories);
categories.get("/new", categoryController.getNewCategoryForm);
categories.post("/new", categoryController.createCategory);

module.exports = categories;
