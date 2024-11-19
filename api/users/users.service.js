const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserReviews,
    getUserByUsername,  // Updated function to use getUserByUsername
} = require('./users.model');

const createUserService = async (userData) => {
    console.log('Creating user with data:', userData);
    return await createUser(userData.username, userData.password, userData.email, userData.role);
};

const getAllUsersService = async () => {
    console.log('Fetching all users');
    return await getAllUsers();
};

const getUserByIdService = async (id) => {
    console.log('Fetching user by ID:', id);
    return await getUserById(id);
};

const updateUserService = async (id, userData) => {
    console.log('Updating user with ID:', id, 'with data:', userData);
    return await updateUser(id, userData);
};

const deleteUserService = async (id) => {
    console.log('Deleting user with ID:', id);
    return await deleteUser(id);
};

const getUserReviewsService = async (userId) => {
    console.log('Fetching reviews for user with ID:', userId);
    return await getUserReviews(userId);
};

const getUserByUsernameService = async (username) => {
    console.log('Fetching user by username:', username);
    return await getUserByUsername(username);  // Updated service function
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getUserReviewsService,
    getUserByUsernameService,  
};
