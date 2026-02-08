const productService = require("../services/product.service");

// CREATE PRODUCT (ADMIN)
const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    // validation
    if (!name || !price) {
      return res.status(400).json({
        message: "Product name and price are required"
      });
    }

    const product = await productService.createProduct(name, price);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS (PUBLIC)
const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT (ADMIN)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name && !price) {
      return res.status(400).json({
        message: "At least one field (name or price) is required"
      });
    }

    const updated = await productService.updateProduct(id, name, price);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT (ADMIN)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
