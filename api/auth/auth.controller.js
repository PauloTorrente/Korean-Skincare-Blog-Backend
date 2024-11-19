const authService = require('./auth.service');

// Login function (Use username)
const login = async (req, res) => {
  const { username, password } = req.body; // Use username for login
  try {
    const response = await authService.loginUser(username, password);
    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Register function (Use email and username)
const register = async (req, res) => {
  const { username, email, password } = req.body; 
  try {
    const response = await authService.registerUser(username, password, email);
    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    res.status(400).json({ message: 'Registration failed' });
  }
};

module.exports = {
  login,
  register,
};
