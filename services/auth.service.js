const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const registerUser = async ({ email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

    db.query(sql, [email, hashedPassword, role || "user"], (err, result) => {
      if (err) return reject(err);

      resolve({
        id: result.insertId,
        email,
        role: role || "user"
      });
    });
  });
};

const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return resolve(null);

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      resolve(token);
    });
  });
};

module.exports = { registerUser, loginUser };
