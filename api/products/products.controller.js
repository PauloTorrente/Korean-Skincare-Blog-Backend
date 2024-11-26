const Product = require('./products.model');

// Add a new product with an Imgur URL
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, image_url } = req.body; // Use image_url instead of file uploads

    if (!image_url) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const newProduct = await Product.createProduct({
      name,
      price,
      description,
      category,
      brand,
      image: image_url, // Use the provided image URL
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
  const { name, price, description, category, brand, image_url } = req.body;

  try {
    const updatedProduct = await Product.updateProduct(id, {
      name,
      price,
      description,
      category,
      brand,
      image: image_url, // Update with new image URL
    });

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
