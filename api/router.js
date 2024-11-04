const express = require('express');
const authRouter = require('./auth/auth.router'); 
const usersRouter = require('./users/users.router'); 
const blogRouter = require('./blog/blog.router');
const authenticate = require('../middlewares/auth.middleware'); 
const checkAdmRole = require('../middlewares/role.middleware'); 

const router = express.Router();

// Routes
router.use('/auth', authRouter); 
router.use('/users', authenticate, checkAdmRole, usersRouter); 
router.use('/blog', authenticate, blogRouter); 
module.exports = router; 
