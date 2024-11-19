const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Create a new user
const createUser = async (username, password, email, role) => {
    try {
        await sql`INSERT INTO users (username, password_hash, email, role) VALUES (${username}, ${password}, ${email}, ${role})`;
        return { message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('User creation failed');
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const result = await sql`SELECT * FROM users`;
        return result;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};

// Get a user by ID
const getUserById = async (id) => {
    try {
        const result = await sql`SELECT * FROM users WHERE id = ${id}`;
        return result[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
};

// Get a user by username (Updated function to get user by username)
const getUserByUsername = async (username) => {
    try {
        const result = await sql`SELECT * FROM users WHERE username = ${sql(username)}`;
        return result[0];
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Failed to fetch user by username');
    }
};

// Update a user
const updateUser = async (id, userData) => {
    const { username, email, password } = userData;
    try {
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) updates.password_hash = password; // Using password_hash for consistency

        const result = await sql`UPDATE users SET ${sql(updates)} WHERE id = ${id}`;
        if (result.count === 0) {
            throw new Error('No user found to update');
        }
        return { message: 'User updated successfully' };
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('User update failed');
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        const result = await sql`DELETE FROM users WHERE id = ${id}`;
        if (result.count === 0) {
            throw new Error('No user found to delete');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('User deletion failed');
    }
};

// Get user reviews
const getUserReviews = async (userId) => {
    try {
        const result = await sql`
            SELECT 
                r.id AS review_id,
                g.name AS game_name,
                r.narrative_rating,
                r.gameplay_rating,
                r.artistic_rating,
                r.created_at
            FROM 
                reviews r
            JOIN 
                games g ON r.game_id = g.id
            WHERE 
                r.user_id = ${userId}
        `;
        return result;
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        throw new Error('Failed to fetch user reviews');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername, 
    updateUser,
    deleteUser,
    getUserReviews,
};
