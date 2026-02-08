const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // ✅ comma fixed
  port: process.env.DB_PORT,       // ✅ MySQL port
  ssl: {
    rejectUnauthorized: false      // ✅ REQUIRED for Railway
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:");
    console.error(err.message);    // show real error
  } else {
    console.log("✅ MySQL connected");
  }
});

module.exports = db;
