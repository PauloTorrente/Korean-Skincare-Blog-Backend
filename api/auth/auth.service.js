const bcrypt = require('bcrypt');
const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');
const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

// Register a new user
const registerUser = async (username, password, email, role = 'user') => {
    console.log('Registering user:', { username, email, role });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (username, password, email, role) VALUES (${username}, ${hashedPassword}, ${email}, ${role})
        `;
        console.log('User registered successfully');
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('User registration failed');
    }
};

// Login user and issue tokens (use username instead of email)
const loginUser = async (username, password) => {
  console.log('Logging in user:', username); // Logging the username instead of email
  try {
      // Add logging for the actual query
      const query = sql`
      SELECT * FROM users WHERE username = ${username}
      `;
      console.log('Executing query:', query.text); // Log the query text for debugging
      const result = await query;
      console.log('SQL result:', result); // Log the result of the query

      const user = result[0];

      if (!user) {
          console.error('User not found for username:', username); // Update log message
          throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password validation result:', isPasswordValid);
      if (!isPasswordValid) {
          throw new Error('Invalid password');
      }

      const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRATION }
      );
      const refreshToken = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: REFRESH_TOKEN_EXPIRATION }
      );

      await sql`
          UPDATE users SET refresh_token = ${refreshToken} WHERE id = ${user.id}
      `;
      console.log('Login successful, tokens issued');
      return { message: 'Login successful', token, refreshToken };
  } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
  }
};

// Refresh access token using refresh token
const refreshAccessToken = async (refreshToken) => {
    console.log('Refreshing token:', refreshToken);
    if (!refreshToken) {
        throw new Error('Refresh token not provided');
    }
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        console.log('Decoded refresh token:', decoded);
        const result = await sql`
            SELECT * FROM users WHERE id = ${decoded.id}
        `;
        console.log('User query result for refresh token:', result);
        const user = result[0];

        if (!user || user.refresh_token !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const newToken = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );
        console.log('New access token issued');
        return { token: newToken };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Could not refresh access token');
    }
};

module.exports = { registerUser, loginUser, refreshAccessToken };
