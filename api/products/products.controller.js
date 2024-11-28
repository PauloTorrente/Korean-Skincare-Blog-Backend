const Product = require('./products.model');

// Add a new product with multiple image URLs
const addProduct = async (req, res) => {
  try {
    // Extract the product details from the request body
    const { name, price, description, category, brand, image_urls } = req.body;

    // Ensure that at least one image URL is provided
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
      // If no image URLs are provided, return an error message
      return res.status(400).json({ message: 'At least one image URL is required' });
    }

    // Create the product in the database using the model's createProduct function
    const newProduct = await Product.createProduct({
      name,
      price,
      description,
      category,
      brand,
      images: image_urls, // Store the array of image URLs
    });

    // Respond with the newly created product
    res.status(201).json(newProduct);
  } catch (error) {
    // If there is an error during product creation, send an error response
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Fetch all products
const getProducts = async (req, res) => {
  try {
    // Call the model function to get all products from the database
    const products = await Product.getAllProducts();

    // Respond with the list of products
    res.status(200).json(products);
  } catch (error) {
    // If there is an error fetching products, send an error response
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Fetch products by category
const getProductByCategory = async (req, res) => {
  const { category } = req.params; // Extract the category from the request parameters
  try {
    // Call the model function to get products by category
    const products = await Product.getProductsByCategory(category);

    // If no products are found in the specified category, return a not found error
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    // Respond with the list of products in the specified category
    res.status(200).json(products);
  } catch (error) {
    // If there is an error fetching products by category, send an error response
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Fetch a product by its ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Extract the product ID from the request parameters
  try {
    // Call the model function to get the product by ID
    const product = await Product.getProductById(id);

    // If the product is not found, return a not found error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the product details
    res.status(200).json(product);
  } catch (error) {
    // If there is an error fetching the product by ID, send an error response
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by its ID
const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract the product ID from the request parameters
  const { name, price, description, category, brand, image_urls } = req.body; // Extract the updated product details from the request body

  try {
    // Ensure the provided image URLs are an array
    if (!Array.isArray(image_urls)) {
      return res.status(400).json({ message: 'Image URLs must be an array' });
    }

    // Call the model function to update the product in the database
    const updatedProduct = await Product.updateProduct(id, {
      name,
      price,
      description,
      category,
      brand,
      images: image_urls,
    });

    // If the product with the given ID is not found, return a not found error
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the updated product details
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    // If there is an error updating the product, send an error response
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
