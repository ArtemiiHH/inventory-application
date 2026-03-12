const db = require("../db/queries");

exports.getProducts = async function (req, res) {
  const products = await db.getAllProducts();
  console.log(`All products: ${products}`);
  res.render("products", {
    products,
  });
};

exports.getProductById = (req, res) => {};

exports.createProduct = (req, res) => {};

exports.updateProduct = (req, res) => {};

exports.deleteProduct = (req, res) => {};
