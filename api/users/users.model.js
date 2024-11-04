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

// Get a user by email
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Update a user
const updateUser = async (id, userData) => {
    const { username, email, password } = userData;
    try {
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) updates.password_hash = password;

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

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
