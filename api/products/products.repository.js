import Product from './products.model.js';  // Import the Product model for interacting with the database

// Create a new product in the database
export const create = async (productData) => {
  try {
    // Call the create function from the Product model to insert the new product
    return await Product.create(productData);
  } catch (error) {
    // If an error occurs while creating the product, log it and throw an error
    console.error('Error creating product in repository:', error);
    throw new Error('Product creation failed in repository');
  }
};

// Fetch products by category
export const findByCategory = async (category) => {
  try {
    // Use the Product model's findAll method to fetch products that belong to the specified category
    return await Product.findAll({ where: { category } });
  } catch (error) {
    // If an error occurs while fetching products by category, log it and throw an error
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
};

// Fetch all products with optional filtering
export const findAll = async (filter = {}) => {
  try {
    // Use the Product model's findAll method with a filter to fetch products
    return await Product.findAll({ where: filter });
  } catch (error) {
    // If an error occurs while fetching products, log it and throw an error
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch all products');
  }
};

// Fetch a product by its ID
export const findById = async (id) => {
  try {
    // Use the Product model's findByPk method to fetch a product by its ID
    return await Product.findByPk(id);
  } catch (error) {
    // If an error occurs while fetching the product by ID, log it and throw an error
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product by ID');
  }
};

// Update an existing product by its ID
export const update = async (id, updateData) => {
  try {
    // Use the Product model's update method to update the product's details
    const [updated] = await Product.update(updateData, { where: { id } });

    // If the product was updated, fetch the updated product and return it
    if (updated) {
      return await Product.findByPk(id);
    }

    // If no rows were updated, return null
    return null;
  } catch (error) {
    // If an error occurs while updating the product, log it and throw an error
    console.error('Error updating product:', error);
    throw new Error('Product update failed in repository');
  }
};

// Delete a product by its ID
export const deleteById = async (id) => {
  try {
    // Use the Product model's destroy method to delete the product by its ID
    const deleted = await Product.destroy({ where: { id } });

    // Return the result (number of deleted rows)
    return deleted;
  } catch (error) {
    // If an error occurs while deleting the product, log it and throw an error
    console.error('Error deleting product:', error);
    throw new Error('Product deletion failed');
  }
};
