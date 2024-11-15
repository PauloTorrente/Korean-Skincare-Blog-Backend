const express = require('express');
const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const blogRouter = require('./blog/blog.router');
const productsRouter = require('./products/products.router');
const authenticate = require('../middlewares/auth.middleware');
const checkAdmRole = require('../middlewares/role.middleware');

const router = express.Router();

// Debugging logs to check types of routers
console.log('authRouter type:', typeof authRouter);
console.log('usersRouter type:', typeof usersRouter);
console.log('blogRouter type:', typeof blogRouter);
console.log('productsRouter type:', typeof productsRouter);

// Routes
router.use('/auth', authRouter);
router.use('/users', authenticate, checkAdmRole, usersRouter);
router.use('/blog', authenticate, blogRouter);

// Public route for products (e.g., viewing products)
router.use('/products', productsRouter); // No authentication here

// Refresh token route
router.post('/refresh', require('./blog/blog.controller').refreshAccessTokenController);

module.exports = router;
