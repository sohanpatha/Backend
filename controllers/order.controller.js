const orderService = require("../services/order.service");
console.log(orderService);
const createOrder = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    console.log("Parsed productId:", productId);
    console.log("Parsed quantity:", quantity);

    if (
      !productId ||
      quantity === undefined ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message: "productId and valid quantity are required"
      });
    }

    const result =
      await orderService.createOrderWithTransaction(
        userId,
        productId,
        quantity
      );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// GET ORDERS
// - Admin → all orders
// - User → only own orders
const getOrders = async (req, res, next) => {
  try {
    const { userId, role } = req.user;

    let orders;
    if (role === "admin") {
      orders = await orderService.getAllOrders();
    } else {
      orders = await orderService.getOrdersByUser(userId);
    }

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// DELETE ORDER (ADMIN only)
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    await orderService.deleteOrder(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder
};
