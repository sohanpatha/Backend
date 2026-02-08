const express = require("express");
const app = express();
require("dotenv").config();

// --------------------
// GLOBAL MIDDLEWARES
// --------------------
app.use(express.json()); // parse JSON body

// --------------------
// DATABASE & CACHE
// --------------------
require("./config/db");      

// --------------------
// ROUTE IMPORTS
// --------------------
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

// --------------------
// ROUTE REGISTRATION
// --------------------
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// --------------------
// ERROR HANDLER (LAST)
// --------------------
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

// --------------------
// SERVER START
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
