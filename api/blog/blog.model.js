const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Create a new blog post (no userId required)
const createBlogPost = async (title, content, imageUrl) => {
    try {
        const result = await sql`INSERT INTO blog (title, content, image_url) VALUES (${title}, ${content}, ${imageUrl}) RETURNING *`;
        return result[0];
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw new Error('Blog post creation failed');
    }
};

// Get all blog posts (public)
const getAllBlogPosts = async () => {
    try {
        const result = await sql`SELECT * FROM blog`;
        return result;
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        throw new Error('Failed to fetch all blogs');
    }
};

// Update a blog post
const updateBlogPost = async (blogId, updatedData) => {
    try {
        const { title, content, imageUrl } = updatedData;
        const result = await sql`
            UPDATE blog 
            SET title = ${title}, content = ${content}, image_url = ${imageUrl} 
            WHERE id = ${blogId} 
            RETURNING *`;
        return result[0];
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw new Error('Blog post update failed');
    }
};

// Delete a blog post
const deleteBlogPost = async (blogId) => {
    try {
        const result = await sql`DELETE FROM blog WHERE id = ${blogId}`;
        if (result.count === 0) {
            throw new Error('No blog post found to delete');
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw new Error('Blog post deletion failed');
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
};
