const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
} = require('./users.model');

// Service for creating a user
const createUserService = async (userData) => {
    return await createUser(userData.username, userData.password, userData.email, userData.role);
};

// Service for getting all users
const getAllUsersService = async () => {
    return await getAllUsers();
};

// Service for getting a user by ID
const getUserByIdService = async (id) => {
    return await getUserById(id);
};

// Service for updating a user
const updateUserService = async (id, userData) => {
    return await updateUser(id, userData);
};

// Service for deleting a user
const deleteUserService = async (id) => {
    return await deleteUser(id);
};

// Service for getting a user by email
const getUserByEmailService = async (email) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            console.log(`No user found with email: ${email}`);
        }
        return user;
    } catch (error) {
        console.error(`Error in getUserByEmailService: ${error.message}`);
        throw error;
    }
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getUserByEmailService,
};
