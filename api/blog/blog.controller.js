const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
    createBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
} = require('./blog.model');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next handler
    });
};

// Create a new blog post (requires user to be logged in)
const createBlogPostController = async (req, res) => {
    const { title, content, imageUrl } = req.body;
    try {
        // Ensure the user is logged in and has a valid JWT token
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.user.id; // Get the user ID from the decoded token
        const blogPost = await createBlogPost(title, content, imageUrl, userId);
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

// Refresh access token using refresh token
const refreshAccessTokenController = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

module.exports = {
    createBlogPostController,
    getAllBlogsController,
    updateBlogPostController,
    deleteBlogPostController,
    refreshAccessTokenController,
};
