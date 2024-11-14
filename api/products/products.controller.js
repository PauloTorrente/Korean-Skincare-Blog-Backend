// products.controller.js
const Product = require('./products.model'); // Import product model

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand } = req.body;
    const image = req.file ? req.file.filename : null;

    // Updated to call createProduct from products.model.js
    const newProduct = await Product.createProduct({ name, price, description, category, brand, image });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    // Updated to call getProductsByCategory from products.model.js
    const products = await Product.getProductsByCategory(category);
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // Updated to call getProductById from products.model.js
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    // Updated to call updateProduct from products.model.js
    const updatedProduct = await Product.updateProduct(id, updateData);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// If delete functionality is needed
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { addProduct, getProductByCategory, getProductById, updateProduct, deleteProduct };
