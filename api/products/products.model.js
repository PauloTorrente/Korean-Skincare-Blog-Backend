const { neon } = require('@neondatabase/serverless');  // Import the Neon serverless database package
const sql = neon(process.env.DATABASE_URL);  // Connect to the database using the provided URL from environment variables

// Create a new product
const createProduct = async (productData) => {
  const { name, price, inStock, category, brand, description, images } = productData;  // Destructure the product data

  try {
    // Insert the new product into the database
    const query = sql`
      INSERT INTO products (name, price, in_stock, category, brand, description, images)
      VALUES (${name}, ${price}, ${inStock}, ${category}, ${brand}, ${description}, ${images})
      RETURNING *`;  // Return the inserted product

    const result = await query;  // Execute the query and store the result

    // Return the newly created product from the result
    return result[0];
  } catch (error) {
    // If an error occurs, log it and throw a new error
    console.error('Error creating product:', error);
    throw new Error('Product creation failed');
  }
};

// Fetch all products from the database
const getAllProducts = async () => {
  try {
    const result = await sql`SELECT * FROM products`;  // Query to select all products
    return result;  // Return the result (list of products)
  } catch (error) {
    // If an error occurs while fetching the products, log it and throw an error
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Fetch products by category
const getProductsByCategory = async (category) => {
  try {
    // Query to select products by category
    const result = await sql`SELECT * FROM products WHERE category = ${category}`;
    return result;  // Return the list of products in the specified category
  } catch (error) {
    // If an error occurs while fetching products by category, log it and throw an error
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
};

// Fetch a single product by its ID
const getProductById = async (id) => {
  try {
    // Query to select a product by its ID
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;
    return result[0];  // Return the first product found (if any)
  } catch (error) {
    // If an error occurs while fetching the product by ID, log it and throw an error
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product by ID');
  }
};

// Update an existing product by its ID
const updateProduct = async (id, updatedData) => {
  const { name, price, inStock, category, brand, description, images } = updatedData;  // Destructure the updated product data

  try {
    // Update the product details in the database
    const query = sql`
      UPDATE products
      SET name = ${name}, price = ${price}, in_stock = ${inStock}, category = ${category},
          brand = ${brand}, description = ${description}, images = ${images}
      WHERE id = ${id}
      RETURNING *`;  // Return the updated product

    const result = await query;  // Execute the query and store the result

    // Return the updated product from the result
    return result[0];
  } catch (error) {
    // If an error occurs while updating the product, log it and throw an error
    console.error('Error updating product:', error);
    throw new Error('Product update failed');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
};
