const db = require("../config/db");

// CREATE PRODUCT
const createProduct = (name, price) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO products (name, price) VALUES (?, ?)";

    db.query(sql, [name, price], (err, result) => {
      if (err) return reject(err);

      resolve({
        id: result.insertId,
        name,
        price
      });
    });
  });
};

// GET ALL PRODUCTS
const getProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// UPDATE PRODUCT
const updateProduct = (id, name, price) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE products SET name=?, price=? WHERE id=?";

    db.query(sql, [name, price, id], (err) => {
      if (err) return reject(err);

      resolve({
        id,
        name,
        price
      });
    });
  });
};

// DELETE PRODUCT
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM products WHERE id=?";

    db.query(sql, [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
