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
