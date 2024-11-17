const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  // Debugging log
  console.log('Authorization middleware invoked. Headers:', req.headers);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Authentication failed:', err); // Detailed error logging
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.role = decoded.role; // Add role to req
    next();
  });
};

module.exports = authenticate;
