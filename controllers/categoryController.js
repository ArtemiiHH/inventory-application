const db = require("../db/queries");

exports.getCategories = async function (req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", {
    title: "All categories",
    categories: categories,
  });
};

exports.getNewCategoryForm = async function (req, res) {
  res.render("newCategory", {
    title: "Add category",
  });
};

exports.getCategoryById = (req, res) => {};

exports.createCategory = (req, res) => {};

exports.updateCategory = (req, res) => {};

exports.deleteCategory = (req, res) => {};
