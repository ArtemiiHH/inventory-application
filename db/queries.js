const pool = require("./pool");

// Products
// Get all products from DB
exports.getAllProducts = async function () {
  try {
    const { rows } = await pool.query("SELECT * FROM sneakers");
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get all brands from DB
exports.getAllBrands = async function () {
  const { rows } = await pool.query("SELECT DISTINCT brand FROM sneakers");
  return rows;
};

// Get product by id
exports.getProductById = async function (id) {
  try {
    const { rows } = await pool.query("SELECT * FROM sneakers WHERE id = $1", [
      id,
    ]);

    return rows[0]; // Return single product, not whole array
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get filtered products
exports.getFilteredProducts = async function ({ sort, brands, categories }) {
  try {
    let query = `SELECT * FROM sneakers WHERE 1 = 1`;
    const params = [];
    let i = 1;

    if (brands.length > 0) {
      query += ` AND brand = ANY($${i++})`;
      params.push(brands);
    }
    if (categories.length > 0) {
      query += ` AND category = ANY($${i++})`;
      params.push(categories);
    }

    query += sort === "desc" ? " ORDER BY price DESC" : " ORDER BY price ASC";

    const { rows } = await pool.query(query, params);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Add new product to DB
exports.addProductToDb = async function (newProduct) {
  try {
    const image = newProduct.image_url
      ? "/images/" + newProduct.image_url
      : "/images/default-shoe.png";

    await pool.query(
      "INSERT INTO sneakers (name, brand, category, stock, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (name) DO NOTHING",
      [
        newProduct.name,
        newProduct.brand,
        newProduct.category,
        newProduct.stock,
        newProduct.price,
        newProduct.description,
        image,
      ],
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Delete product from DB
exports.deleteProductFromDb = async function (id) {
  try {
    await pool.query("DELETE FROM sneakers WHERE id = $1", [id]);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Update product form
exports.updateProduct = async function (id, updatedProduct) {
  try {
    const image = updatedProduct.image_url
      ? "/images/" + updatedProduct.image_url
      : null;

    if (image) {
      await pool.query(
        "UPDATE sneakers SET name = $1, brand = $2, category = $3, stock = $4, price = $5, description = $6, image_url = $7 WHERE id = $8",
        [
          updatedProduct.name,
          updatedProduct.brand,
          updatedProduct.category,
          updatedProduct.stock,
          updatedProduct.price,
          updatedProduct.description,
          image,
          id,
        ],
      );
    } else {
      // No image update
      await pool.query(
        "UPDATE sneakers SET name = $1, brand = $2, category = $3, stock = $4, price = $5, description = $6 WHERE id = $7",
        [
          updatedProduct.name,
          updatedProduct.brand,
          updatedProduct.category,
          updatedProduct.stock,
          updatedProduct.price,
          updatedProduct.description,
          id,
        ],
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Categories
// Get all categories from DB
exports.getAllCategories = async function () {
  try {
    const { rows } = await pool.query("SELECT category FROM categories");
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Add new category to DB
exports.addCategoryToDb = async function (newCategory) {
  try {
    await pool.query("INSERT INTO categories (category) VALUES ($1)", [
      newCategory,
    ]);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
