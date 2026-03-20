const pool = require("./pool");

// Products
// Get all products from DB
exports.getAllProducts = async function () {
  const { rows } = await pool.query("SELECT * FROM sneakers");
  return rows;
};

// Get product by id
exports.getProductById = async function (id) {
  const { rows } = await pool.query("SELECT * FROM sneakers WHERE id = $1", [
    id,
  ]);

  return rows[0]; // Return single product, not whole array
};

// Add new product to DB
exports.addProductToDb = async function (newProduct) {
  await pool.query(
    "INSERT INTO sneakers (name, brand, category, stock, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      newProduct.name,
      newProduct.brand,
      newProduct.category,
      newProduct.stock,
      newProduct.price,
      newProduct.description,
      "/images/" + newProduct.image_url, // Add file path
    ],
  );
};

// Delete product from DB
exports.deleteProductFromDb = async function (id) {
  await pool.query("DELETE FROM sneakers WHERE id = $1", [id]);
};

// Update product form
exports.updateProduct = async function (id, updatedProduct) {
  await pool.query(
    "UPDATE sneakers SET name = $1, brand = $2, category = $3, stock = $4, price = $5, description = $6, image_url = $7 WHERE id = $8",
    [
      updatedProduct.name,
      updatedProduct.brand,
      updatedProduct.category,
      updatedProduct.stock,
      updatedProduct.price,
      updatedProduct.description,
      "/images/" + updatedProduct.image_url,
      id,
    ],
  );
};

// Categories
// Get all categories from DB
exports.getAllCategories = async function () {
  const { rows } = await pool.query("SELECT DISTINCT category FROM sneakers");
  return rows;
};
