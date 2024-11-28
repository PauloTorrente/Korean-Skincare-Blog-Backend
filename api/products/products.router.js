const express = require('express');  // Import express to set up the router
const {
  addProduct,
  getProducts,
  getProductByCategory,
  getProductById,
  updateProduct,
} = require('./products.controller');  // Import controller functions for handling product operations

// Initialize the router instance
const router = express.Router();

// Middleware to log incoming requests (for debugging purposes)
router.use((req, res, next) => {
  // Log the HTTP method and URL of the incoming request
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();  // Proceed to the next middleware or route handler
});

// Define routes and associate them with controller functions
router.get('/', getProducts);  // Handle GET requests to fetch all products
router.post('/', addProduct);  // Handle POST requests to add a new product
router.get('/category/:category', getProductByCategory);  // Handle GET requests to fetch products by category
router.get('/:id', getProductById);  // Handle GET requests to fetch a product by its ID
router.put('/:id', updateProduct);  // Handle PUT requests to update a product by its ID

// Export the router so it can be used in other files (e.g., server.js)
module.exports = router;
