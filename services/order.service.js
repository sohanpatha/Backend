const db = require("../config/db");

// CREATE ORDER WITH TRANSACTION
const createOrderWithTransaction = (userId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);

      // 1️⃣ Check stock
      const checkStockSql = "SELECT stock FROM products WHERE id = ?";
      db.query(checkStockSql, [productId], (err, results) => {
        if (err) return rollback(err);

        if (results.length === 0) {
          return rollback(new Error("Product not found"));
        }

        if (results[0].stock < quantity) {
          return rollback(new Error("Insufficient stock"));
        }

        // 2️⃣ Insert order
        const orderSql =
          "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)";
        db.query(orderSql, [userId, productId, quantity], (err, orderResult) => {
          if (err) return rollback(err);

          // 3️⃣ Update stock
          const updateStockSql =
            "UPDATE products SET stock = stock - ? WHERE id = ?";
          db.query(updateStockSql, [quantity, productId], (err) => {
            if (err) return rollback(err);

            // 4️⃣ Commit
            db.commit((err) => {
              if (err) return rollback(err);

              resolve({
                orderId: orderResult.insertId,
                message: "Order placed successfully"
              });
            });
          });
        });
      });

      function rollback(error) {
        db.rollback(() => reject(error));
      }
    });
  });
};

// GET ALL ORDERS (ADMIN)
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT o.id, u.email, p.name AS product, o.quantity, o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// GET ORDERS BY USER
const getOrdersByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT o.id, p.name AS product, o.quantity, o.created_at
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.user_id = ?
    `;
    db.query(sql, [userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  createOrderWithTransaction,
  getAllOrders,
  getOrdersByUser
};
