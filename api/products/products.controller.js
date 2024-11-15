const Product = require('./products.model');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = await Product.createProduct({
      name,
      price,
      description,
      category,
      brand,
      image,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Get all products (public endpoint)
const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get products by category
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
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

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
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

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
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

module.exports = {
  addProduct,
  getProducts,
  getProductByCategory,
  getProductById,
  updateProduct,
};
