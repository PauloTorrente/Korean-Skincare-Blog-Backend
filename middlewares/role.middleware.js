const checkAdmRole = (req, res, next) => {
  console.log('User role:', req.user?.role); // Log the user role for debugging

  if (!req.user || req.user.role !== 'admin') { // Check if role is admin
      console.error('Access denied: Not an admin'); // Log access denial
      return res.status(403).json({ message: 'Forbidden' }); // Forbidden
  }
  next(); // Allow access if admin
};

module.exports = checkAdmRole;
