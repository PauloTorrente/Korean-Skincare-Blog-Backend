import { neon } from '@neondatabase/serverless';  // Import the Neon database client
const sql = neon(process.env.DATABASE_URL);  // Set up a connection to the database using the provided URL

// Add a new product with multiple image URLs
export const addProduct = async (productData) => {
    try {
        // Destructure the product data from the function argument
        const { name, price, inStock, category, brand, description, images } = productData;

        // Validate that images is an array and contains at least one image URL
        if (!Array.isArray(images) || images.length === 0) {
            throw new Error('At least one image URL is required');
        }

        // Insert the product into the database, passing all product data including images
        const result = await sql`
            INSERT INTO products (name, price, in_stock, category, brand, description, images) 
            VALUES (${name}, ${price}, ${inStock}, ${category}, ${brand}, ${description}, ${images}) 
            RETURNING *`;  // Return the inserted product data
        return result[0];  // Return the first product (since only one product is created at a time)
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error adding product:', error);
        throw new Error('Product addition failed');
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        // Query the database to fetch all products
        const result = await sql`SELECT * FROM products`;
        return result;  // Return the list of products
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

// Get products by category
export const getProductByCategory = async (category) => {
    try {
        // Query the database to fetch products by the specified category
        const result = await sql`SELECT * FROM products WHERE category = ${category}`;
        return result;  // Return the list of products in the specified category
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products by category');
    }
};

// Get a product by ID
export const getProductById = async (id) => {
    try {
        // Query the database to fetch a product by its ID
        const result = await sql`SELECT * FROM products WHERE id = ${id}`;
        return result[0];  // Return the first result (there should only be one product with a given ID)
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

// Update a product by ID with multiple image URLs
export const updateProduct = async (id, updatedData) => {
    try {
        // Destructure the updated product data
        const { name, price, inStock, category, brand, description, images } = updatedData;

        // Validate that images is an array
        if (!Array.isArray(images)) {
            throw new Error('Images must be an array');
        }

        // Update the product in the database with the new details
        const result = await sql`
            UPDATE products 
            SET name = ${name}, price = ${price}, in_stock = ${inStock}, category = ${category}, 
                brand = ${brand}, description = ${description}, images = ${images}
            WHERE id = ${id} 
            RETURNING *`;  // Return the updated product data
        return result[0];  // Return the first result (only one product will be updated)
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error updating product:', error);
        throw new Error('Product update failed');
    }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        // Delete the product with the specified ID from the database
        const result = await sql`DELETE FROM products WHERE id = ${id}`;
        
        // If no rows were deleted, throw an error
        if (result.count === 0) {
            throw new Error('No product found to delete');
        }
    } catch (error) {
        // Log the error and throw a custom error message
        console.error('Error deleting product:', error);
        throw new Error('Product deletion failed');
    }
};
