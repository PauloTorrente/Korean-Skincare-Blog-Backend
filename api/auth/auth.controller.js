const authService = require('./auth.service');
const bcrypt = require('bcrypt'); 
const { getUserByEmailService } = require('./users.service');

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Attempting login for email: ${email}`);

  try {
    // Fetch user by email
    const user = await getUserByEmailService(email);
    if (!user) {
      console.warn(`No user found with email: ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn('Invalid password attempt');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with role and user details
    const token = await authService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    console.log(`Login successful for user: ${email}`);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error(`Login error for email ${email}:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Register function
const register = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body; 
  try {
    // Register user
    const token = await authService.register({ username, email, password, role });

    console.log(`User registered successfully: ${email}`);
    res.status(201).json({ token });
  } catch (error) {
    console.error(`Registration error for email ${email}:`, error.message);
    res.status(400).json({ message: 'Registration failed' });
  }
};

module.exports = {
  login,
  register,
};
