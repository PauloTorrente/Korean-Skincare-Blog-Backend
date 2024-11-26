const express = require('express');
const {
  addProduct,
  getProducts,
  getProductByCategory,
  getProductById,
  updateProduct,
} = require('./products.controller');

// Initialize Router
const router = express.Router();

// Define routes with controller functions
router.get('/', getProducts);
router.post('/', addProduct);
router.get('/category/:category', getProductByCategory);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

module.exports = router;
