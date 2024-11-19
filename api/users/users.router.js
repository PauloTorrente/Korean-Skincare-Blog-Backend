const express = require('express');
const {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    getUserReviewsController,
    loginUserController,
} = require('./users.controller');
const authenticate = require('../../middlewares/auth.middleware');
const checkAdmRole = require('../../middlewares/role.middleware'); 

const router = express.Router();

// Route to create a new user (admin only)
router.post('/', authenticate, checkAdmRole, createUserController);

// Route to get all users (admin only)
router.get('/', authenticate, checkAdmRole, getAllUsersController);

// Route to get a user by ID (admin only)
router.get('/:id', authenticate, checkAdmRole, getUserByIdController);

// Route to update a user (admin only)
router.put('/:id', authenticate, checkAdmRole, updateUserController);

// Route to delete a user (admin only)
router.delete('/:id', authenticate, checkAdmRole, deleteUserController);

// Route to get user reviews by user ID (admin only)
router.get('/:id/reviews', authenticate, checkAdmRole, getUserReviewsController);

// Route for user login
router.post('/login', loginUserController);

module.exports = router;
