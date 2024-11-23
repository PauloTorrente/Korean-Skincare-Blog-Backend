// Middleware to check admin role
const checkAdmRole = (req, res, next) => {
  // Verify if the user is authenticated and has a role assigned
  if (!req.user || !req.user.role) {
    console.error('User not authenticated or role not defined.');
    return res.status(403).json({ message: 'Access denied: User not authenticated or role not set' });
  }

  console.log('User role:', req.user.role); // Debugging log

  // Check if the user's role is "admin"
  if (req.user.role !== 'admin') {
    console.error('Access denied: User is not an admin.'); // Log the reason
    return res.status(403).json({ message: 'Forbidden: Admin role required' });
  }

  next(); // Allow access if the role is "admin"
};

module.exports = checkAdmRole;
