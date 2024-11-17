const checkAdmRole = (req, res, next) => {
  console.log('User role:', req.role); // Log the user role for debugging

  if (!req.role || req.role !== 'admin') { // Check if role is admin
      console.error('Access denied: Not an admin'); // Log access denial
      return res.status(403).json({ message: 'Forbidden' }); // Forbidden
  }
  next(); // Allow access if admin
};

module.exports = checkAdmRole;
