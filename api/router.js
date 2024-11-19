const express = require('express');

// Import routers from API modules
const authRouter = require('./auth/auth.router');
const blogRouter = require('./blog/blog.router');
const productsRouter = require('./products/products.router');
const usersRouter = require('./users/users.router');

// Import middleware for authentication and role validation
const authenticate = require('../middlewares/auth.middleware');
const checkAdmRole = require('../middlewares/role.middleware');

const router = express.Router();

// Public routes
router.use('/auth', authRouter); // Authentication routes (login/register)
router.use('/products', productsRouter); // Public product browsing

// Protected routes
router.use('/blog', authenticate, blogRouter); // Blog routes (restricted to logged-in users)
router.use('/users', authenticate, checkAdmRole, usersRouter); // User management (admin only)

module.exports = router;
