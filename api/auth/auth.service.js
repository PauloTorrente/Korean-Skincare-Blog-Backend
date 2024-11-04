const bcrypt = require('bcrypt'); 
const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');
const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRATION = '15m'; 
const REFRESH_TOKEN_EXPIRATION = '7d'; 

// Register a new user
const registerUser = async (username, password, email, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (username, password, email, role) VALUES (${username}, ${hashedPassword}, ${email}, ${role})
        `;
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('User registration failed');
    }
};

// Login user and issue tokens
const loginUser = async (username, password) => {
    try {
        const result = await sql`
            SELECT * FROM users WHERE username = ${username}
        `;
        const user = result[0];

        if (!user) {
            throw new Error('User not found'); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (!isPasswordValid) {
            throw new Error('Invalid password'); 
        }

        // Include the role in the token payload
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Add role here
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );
        const refreshToken = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Add role here
            JWT_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRATION }
        );

        // Save the refresh token in the database
        await sql`
            UPDATE users SET refresh_token = ${refreshToken} WHERE id = ${user.id}
        `;

        return { message: 'Login successful', token, refreshToken }; 
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Login failed'); 
    }
};

// Refresh access token using refresh token
const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error('Refresh token not provided');
    }
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const result = await sql`
            SELECT * FROM users WHERE id = ${decoded.id}
        `;
        const user = result[0];

        if (!user || user.refresh_token !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        // Generate a new access token
        const newToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        return { token: newToken };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Could not refresh access token');
    }
};

module.exports = { registerUser, loginUser, refreshAccessToken };
