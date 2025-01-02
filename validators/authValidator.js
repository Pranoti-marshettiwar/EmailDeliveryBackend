// validators/authValidator.js
const { body } = require('express-validator');

exports.signupValidation = [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password should be at least 6 characters').isLength({ min: 6 })
];

exports.loginValidation = [
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Password is required').not().isEmpty()
];
