const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// CREATE product (ADMIN only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  productController.createProduct
);

// GET all products (public)
router.get("/", productController.getProducts);

// UPDATE product (ADMIN only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.updateProduct
);

// DELETE product (ADMIN only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.deleteProduct
);

module.exports = router;
