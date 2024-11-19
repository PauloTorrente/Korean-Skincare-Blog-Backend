const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserReviews,
    getUserByUsername,  // Updated function to get user by username
    getUserGrades 
} = require('./users.model');

// Create a new user
const createUserController = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userRole = role || 'user'; 
        const user = await createUser(username, hashedPassword, email, userRole);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID
const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : undefined;
        const updatedUser = await updateUser(id, { username, email, password: hashedPassword });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user reviews
const getUserReviewsController = async (req, res) => {
    const userId = req.params.id;
    try {
        const reviews = await getUserReviews(userId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user reviews' });
    }
};

// Login user (Updated to use username)
const loginUserController = async (req, res) => {
    const { username, password } = req.body;  // Changed email to username
    try {
        const user = await getUserByUsername(username);  // Changed function to get user by username
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash); // Use password_hash here
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get grades given by a user
const getUserGradesController = async (req, res) => {
    const userId = req.params.id;
    try {
        const grades = await getUserGrades(userId);
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user grades' });
    }
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    getUserReviewsController,
    loginUserController,
    getUserGradesController 
};
