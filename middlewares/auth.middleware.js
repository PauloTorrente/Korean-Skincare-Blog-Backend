const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is present in the header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Token not provided or invalid format.');
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from the header
  console.log('Received token:', token); // Debugging log

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded); // Debugging log

    req.user = decoded; // Attach decoded user info to `req`
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification failed:', error.message); // Log the error
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
