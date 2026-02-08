const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// CREATE ORDER (Logged-in user)
router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

// GET ORDERS
// - User → sees own orders
// - Admin → sees all orders
router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

// DELETE ORDER (ADMIN only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  orderController.deleteOrder
);

module.exports = router;
