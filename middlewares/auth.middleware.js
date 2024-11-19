const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    console.log('Token:', token); // Log the token for debugging

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        console.log('Decoded user:', decoded); // Log decoded user for debugging
        req.user = decoded; // Assign user info to req.user
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Log the error
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
