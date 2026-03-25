const db = require("../db/queries");

exports.getCategories = async function (req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("categories", {
      title: "All categories",
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading categories");
  }
};

exports.getNewCategoryForm = async function (req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("newCategory", {
      title: "Add category",
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};

exports.getCategoryById = async function (req, res) {};

exports.createCategory = async function (req, res) {
  const { categoryName } = req.body;
  await db.addCategoryToDb(categoryName);
  res.redirect("/categories");
};

exports.updateCategory = async function (req, res) {};

exports.deleteCategory = async function (req, res) {};
