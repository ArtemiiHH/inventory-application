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

exports.getProductById = async function (req, res) {
  const id = req.params.id;
  const product = await db.getProductById(id);
  res.render("item", {
    title: product.name,
    product: product,
  });
};

exports.createProduct = async function (req, res) {
  // New product's input data
  const newProduct = {
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
    description: req.body.description,
    image_url: req.file?.filename,
  };

  await db.addProductToDb(newProduct);
  // Return to products page after
  res.redirect("/products");
};

exports.getEditProductForm = async function (req, res) {
  const id = req.params.id;
  const product = await db.getProductById(id);

  res.render("editProduct", {
    title: "Edit product",
    product: product,
  });
};

exports.updateProduct = async function (req, res) {
  const id = req.params.id;
  const { name, brand, category, stock, price, description } = req.body;

  const updatedProduct = { name, brand, category, stock, price, description };
  updatedProduct.image_url = req.file ? rew.file.filename : "default-shoe.png";

  await db.updateProduct(id, updatedProduct);
  res.redirect(`/products/${id}`);
};

exports.deleteProduct = async function (req, res) {
  const id = req.params.id;
  await db.deleteProductFromDb(id);
  res.redirect("/products");
};
