const express = require('express');
const multer = require('multer');
const { addProduct, getProducts, getProductByCategory, getProductById, updateProduct } = require('./products.controller'); 

// Initialize Router
const router = express.Router();

// Setup for Multer (Image Upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Define routes with controller functions

// Route to get all products (public endpoint)
router.get('/', getProducts);

// Route to add a product with image upload
router.post('/', upload.single('image'), addProduct);

// Route to get products by category
router.get('/category/:category', getProductByCategory);

// Route to get a single product by ID
router.get('/:id', getProductById);

// Route to update a product by ID
router.put('/:id', updateProduct);

module.exports = router; // Export the router instance
