// models/User.js
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // Store hashed passwords
    }
}

const users = []; // Temporary in-memory storage for users

module.exports = {
    User, // Export the User class
    findOne: (query) => {
        return users.find(user => user.username === query.username);
    },
    save: (user) => {
        users.push(user);
        return user;
    },
    // Add other methods if necessary (e.g., findById, etc.)
};
