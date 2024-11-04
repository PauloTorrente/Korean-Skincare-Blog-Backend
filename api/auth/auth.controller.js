const authService = require('./auth.service');

// Login function
const login = async (req, res) => {
  const { username, password } = req.body; 
  try {
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Register function
const register = async (req, res) => {
  const { username, email, password } = req.body; 
  try {
    const token = await authService.register(username, email, password);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    res.status(400).json({ message: 'Registration failed' });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Attempting login for email: ${email}`); // Log email from request

  try {
      const user = await getUserByEmailService(email);
      if (!user) {
          console.log(`No user found with email: ${email}`);
          return res.status(404).json({ error: 'User not found' });
      }
      
      console.log(`Retrieved user: ${JSON.stringify(user)}`); // Log user details

      const isMatch = await bcrypt.compare(password, user.password); // Adjust to correct password field
      if (!isMatch) {
          console.log('Password does not match');
          return res.status(401).json({ error: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful' });
  } catch (error) {
      console.error(`Error logging in: ${error.message}`);
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  loginUserController,
};
