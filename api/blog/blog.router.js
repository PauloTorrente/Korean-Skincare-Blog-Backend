const express = require('express');
const {
    createBlogPostController,
    getUserBlogsController,
    updateBlogPostController,
    deleteBlogPostController,
} = require('./blog.controller');
const authenticate = require('../../middlewares/auth.middleware');

const router = express.Router();

// Route to create a new blog post
router.post('/', authenticate, createBlogPostController);

// Route to get all blog posts by user
router.get('/:id', authenticate, getUserBlogsController);

// Route to update a blog post
router.put('/:blogId', authenticate, updateBlogPostController);

// Route to delete a blog post
router.delete('/:blogId', authenticate, deleteBlogPostController);

module.exports = router;
