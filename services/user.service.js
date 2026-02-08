const db = require("../config/db");

// GET USERS WITH PAGINATION, FILTER & SEARCH
const getUsers = (limit, offset, role, search) => {
  let sql = "SELECT id, email, role FROM users WHERE 1=1";
  let params = [];

  if (role) {
    sql += " AND role = ?";
    params.push(role);
  }

  if (search) {
    sql += " AND email LIKE ?";
    params.push(`%${search}%`);
  }

  sql += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// GET USER BY ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, email, role FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// UPDATE USER
const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET role=? WHERE id=?";
    db.query(sql, [data.role, id], (err) => {
      if (err) reject(err);
      else resolve({ id, ...data });
    });
  });
};

// DELETE USER
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id=?";
    db.query(sql, [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
