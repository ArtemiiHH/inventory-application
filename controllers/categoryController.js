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

exports.getCategoryById = async function (req, res) {};

exports.createCategory = async function (req, res) {};

exports.updateCategory = async function (req, res) {};

exports.deleteCategory = async function (req, res) {};
