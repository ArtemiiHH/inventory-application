const pool = require("./pool");

// Get all products from DB
exports.getAllProducts = async function () {
  const { rows } = await pool.query("SELECT * FROM sneakers");
  return rows;
};

// Get all categories from DB
exports.getAllCategories = async function () {
  const { rows } = await pool.query("SELECT DISTINCT category FROM sneakers");
  return rows;
};

// Insert new product name
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
