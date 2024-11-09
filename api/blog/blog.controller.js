const {
    createBlogPost,
    getUserBlogs,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
} = require('./blog.model');

// Create a new blog post
const createBlogPostController = async (req, res) => {
    const { userId, title, content, imageUrl } = req.body;
    try {
        const blogPost = await createBlogPost(userId, title, content, imageUrl);
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all blog posts (public)
const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await getAllBlogPosts();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all blogs' });
    }
};

// Get all blog posts by user
const getUserBlogsController = async (req, res) => {
    const userId = req.params.id;
    try {
        const blogs = await getUserBlogs(userId);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user blogs' });
    }
};

// Update a blog post
const updateBlogPostController = async (req, res) => {
    const { blogId } = req.params;
    const updatedData = req.body;
    try {
        const updatedBlogPost = await updateBlogPost(blogId, updatedData);
        res.status(200).json(updatedBlogPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog post
const deleteBlogPostController = async (req, res) => {
    const { blogId } = req.params;
    try {
        await deleteBlogPost(blogId);
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBlogPostController,
    getUserBlogsController,
    getAllBlogsController, 
    updateBlogPostController,
    deleteBlogPostController,
};
