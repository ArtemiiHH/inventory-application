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

exports.createProduct = async function (req, res) {
  const newProduct = {
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
    description: req.body.description,
    image_url: req.body.path,
  };
};

exports.updateProduct = (req, res) => {};

exports.deleteProduct = (req, res) => {};
