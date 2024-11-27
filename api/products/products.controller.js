const Product = require('./products.model');

// Add a new product with multiple image URLs
const addProduct = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, price, description, category, brand, image_urls } = req.body; // Accepts an array of image URLs

    // Validate if at least one image URL is provided
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
      return res.status(400).json({ message: 'At least one image URL is required' });
    }

    // Create the product with the provided details
    const newProduct = await Product.createProduct({
      name,
      price,
      description,
      category,
      brand,
      images: image_urls, // Save array of image URLs
    });

    // Return the created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Fetch products by category
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

// Fetch a product by ID
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
  const { name, price, description, category, brand, image_urls } = req.body;

  try {
    // Ensure image URLs are provided as an array
    if (!Array.isArray(image_urls)) {
      return res.status(400).json({ message: 'Image URLs must be an array' });
    }

    // Update the product with new details
    const updatedProduct = await Product.updateProduct(id, {
      name,
      price,
      description,
      category,
      brand,
      images: image_urls,
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
