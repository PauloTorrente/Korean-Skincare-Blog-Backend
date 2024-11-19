const usersModel = require('./users.model');

// Repository to handle user creation
exports.createUser = async (user) => {
    return await usersModel.createUser(user);
};

// Repository to fetch all users
exports.getAllUsers = async () => {
    return await usersModel.getAllUsers();
};

// Repository to fetch a user by ID
exports.getUserById = async (id) => {
    return await usersModel.getUserById(id);
};

// Repository to delete a user by ID
exports.deleteUser = async (id) => {
    return await usersModel.deleteUser(id);
};
