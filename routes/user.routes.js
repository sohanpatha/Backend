const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// ADMIN: Get all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getUsers
);

// AUTHENTICATED: Get user by ID
router.get(
  "/:id",
  authMiddleware,
  userController.getUserById
);

// AUTHENTICATED: Update user
router.put(
  "/:id",
  authMiddleware,
  userController.updateUser
);

// ADMIN: Delete user
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  userController.deleteUser
);

module.exports = router;
