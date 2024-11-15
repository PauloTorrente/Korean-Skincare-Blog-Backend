const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the "Bearer" scheme

  // Debugging log
  console.log('Authorization middleware invoked. Headers:', req.headers);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id; // Store user ID in request
    next();
  });
};

module.exports = authenticate;
