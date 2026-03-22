const db = require("../db/queries");
const fs = require("fs");
const path = require("node:path");

exports.getProducts = async function (req, res) {
  try {
    const products = await db.getAllProducts();
    res.render("products", { title: "All products", products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
};

exports.getNewProductForm = async function (req, res) {
  try {
    const categories = await db.getAllCategories();

    res.render("newProduct", {
      title: "Add product",
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};

exports.getProductById = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await db.getProductById(id);

    // If product not found
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Render chosen item
    res.render("item", { title: product.name, product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
};

exports.createProduct = async function (req, res) {
  try {
    const { name, brand, category, stock, price, description } = req.body;
    const errors = [];

    if (!name) errors.push("Name is required");
    if (!brand) errors.push("Brand is required");
    if (!price) errors.push("Price is required");
    if (!description) errors.push("Description is required");

    if (errors.length > 0) {
      const categories = await db.getAllCategories();

      return res.status(422).render("newProduct", {
        title: "Add product",
        errors: errors,
        categories: categories,
        // echo back submitted data so user doesn't lose input
        formData: { name, brand, category, stock, price, description },
      });
    }

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
    // Redirect back to products
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding new product");
  }
};

exports.getEditProductForm = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await db.getProductById(id);

    // Fetch categories too
    const categories = await db.getAllCategories();

    // Product not found
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("editProduct", {
      title: "Edit product",
      product: product,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
};

exports.updateProduct = async function (req, res) {
  try {
    const id = req.params.id;
    const { name, brand, category, stock, price, description } = req.body;
    const errors = [];

    if (!name) errors.push("Name is required");
    if (!brand) errors.push("Brand is required");
    if (!price) errors.push("Price is required");
    if (!description) errors.push("Description is required");

    if (errors.length > 0) {
      const product = await db.getProductById(id);
      const categories = await db.getAllCategories();

      return res.status(422).render("editProduct", {
        title: "Edit product",
        product: {
          ...product,
          name,
          brand,
          category,
          stock,
          price,
          description,
        },
        categories: categories,
        errors: errors,
      });
    }

    const updatedProduct = { name, brand, category, stock, price, description };
    updatedProduct.image_url = req.file ? req.file.filename : null;
    await db.updateProduct(id, updatedProduct);
    res.redirect(`/products/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await db.getProductById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Delete image from local folder
    if (product.image_url) {
      const imagePath = path.join(__dirname, "..", "public", product.image_url);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Image could not be deleted: ", err);
      });
    }

    // Delete from DB
    await db.deleteProductFromDb(id);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
};
