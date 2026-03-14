const pool = require("./pool");

// Products
// Get all products from DB
exports.getAllProducts = async function () {
  const { rows } = await pool.query("SELECT * FROM sneakers");
  return rows;
};

// Get product by id
exports.getProductId = async function (id) {
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
      newProduct.image_url,
    ],
  );
};

// Delete product from DB
exports.deleteProductFromDb = async function (id) {
  const { rows } = await pool.query("DELETE FROM sneakers WHERE id = $1", [id]);

  return rows[0]; // Delete single product, not whole array
};

// Categories
// Get all categories from DB
exports.getAllCategories = async function () {
  const { rows } = await pool.query("SELECT DISTINCT category FROM sneakers");
  return rows;
};
