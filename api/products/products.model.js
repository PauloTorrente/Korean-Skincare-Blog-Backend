const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Function to create a new product (direct SQL insert)
const createProduct = async (productData) => {
    const { name, price, inStock, category, brand, description, image } = productData;
    try {
        const result = await sql`
            INSERT INTO products (name, price, in_stock, category, brand, description, image)
            VALUES (${name}, ${price}, ${inStock}, ${category}, ${brand}, ${description}, ${image})
            RETURNING *`;
        return result[0];  // Return the newly created product
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Product creation failed');
    }
};

// Function to get all products
const getAllProducts = async () => {
    try {
        const result = await sql`SELECT * FROM products`;
        return result;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

// Function to get a product by category
const getProductsByCategory = async (category) => {
    try {
        const result = await sql`SELECT * FROM products WHERE category = ${category}`;
        return result;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products by category');
    }
};

// Function to get product by ID
const getProductById = async (id) => {
    try {
        const result = await sql`SELECT * FROM products WHERE id = ${id}`;
        return result[0];  // Return the first matching product
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

// Function to update a product
const updateProduct = async (id, updatedData) => {
    const { name, price, inStock, category, brand, description, image } = updatedData;
    try {
        const result = await sql`
            UPDATE products
            SET name = ${name}, price = ${price}, in_stock = ${inStock}, category = ${category},
                brand = ${brand}, description = ${description}, image = ${image}
            WHERE id = ${id}
            RETURNING *`;
        return result[0];
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Product update failed');
    }
};

// Function to delete a product
const deleteProduct = async (id) => {
    try {
        const result = await sql`DELETE FROM products WHERE id = ${id}`;
        if (result.count === 0) {
            throw new Error('No product found to delete');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Product deletion failed');
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct,
};
