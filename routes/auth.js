// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../validators/authValidator');
const { validationResult } = require('express-validator');

// Signup route
router.post('/signup', signupValidation, signup);

// Login route
router.post('/login', loginValidation, login);

// Logout route
router.post('/logout', logout);


module.exports = router;
