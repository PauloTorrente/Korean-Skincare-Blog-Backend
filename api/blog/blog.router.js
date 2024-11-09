const express = require('express');
const {
    createBlogPostController,
    getAllBlogsController,
    updateBlogPostController,
    deleteBlogPostController,
} = require('./blog.controller');
const authenticate = require('../../middlewares/auth.middleware');

const router = express.Router();

// Route to create a new blog post (no userId required)
router.post('/', authenticate, createBlogPostController);

// Route to get all blog posts (public)
router.get('/', getAllBlogsController);

// Route to update a blog post
router.put('/:blogId', authenticate, updateBlogPostController);

// Route to delete a blog post
router.delete('/:blogId', authenticate, deleteBlogPostController);

module.exports = router;
