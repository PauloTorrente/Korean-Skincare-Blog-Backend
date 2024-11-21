import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

// Add a new product
export const addProduct = async (productData) => {
    try {
        const { name, price, inStock, category, brand, description, image } = productData;

        // Check if image is valid
        if (!image) {
            throw new Error('Image is required for product creation');
        }

        const result = await sql`
            INSERT INTO products (name, price, in_stock, category, brand, description, image) 
            VALUES (${name}, ${price}, ${inStock}, ${category}, ${brand}, ${description}, ${image}) 
            RETURNING *`;
        return result[0];
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Product addition failed');
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const result = await sql`SELECT * FROM products`;
        return result;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

// Get product by category
export const getProductByCategory = async (category) => {
    try {
        const result = await sql`SELECT * FROM products WHERE category = ${category}`;
        return result;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products by category');
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const result = await sql`SELECT * FROM products WHERE id = ${id}`;
        return result[0];  // Return the first result
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

// Update product
export const updateProduct = async (id, updatedData) => {
    try {
        const { name, price, inStock, category, brand, description, image } = updatedData;
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

// Delete product
export const deleteProduct = async (id) => {
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
