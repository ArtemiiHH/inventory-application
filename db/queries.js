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
exports.addProductToDb = async function (productName) {
  await pool.query("INSERT INTO name (productName) VALUES ($1)", [productName]);
};
