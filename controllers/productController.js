const db = require("../db/queries");

exports.getProducts = async function (req, res) {
  const products = await db.getAllProducts();
  res.render("products", {
    title: "All products",
    products: products,
  });
};

exports.getNewProductForm = async function (req, res) {
  res.render("newProduct", {
    title: "Add product",
  });
};

exports.getProductById = (req, res) => {};

exports.createProduct = (req, res) => {};

exports.updateProduct = (req, res) => {};

exports.deleteProduct = (req, res) => {};
