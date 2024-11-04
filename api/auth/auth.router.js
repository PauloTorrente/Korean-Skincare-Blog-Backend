const express = require('express');
const { registerUser, loginUser, refreshAccessToken } = require('./auth.service');

const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body; 
    try {
        const response = await registerUser(username, password, email, role); 
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to log in
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const response = await loginUser(username, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to refresh access token
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body; 
    try {
        const response = await refreshAccessToken(refreshToken);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
