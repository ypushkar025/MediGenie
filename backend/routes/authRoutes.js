const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware
const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

const validateRegister = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Public routes
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;