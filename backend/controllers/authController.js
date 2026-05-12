    const authService = require('../services/authService');
    const { validationResult } = require('express-validator');

    exports.login = async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const result = await authService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            console.error('Login Error:', error.message);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    };

    exports.register = async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;
            const result = await authService.registerUser(username, email, password);
            res.status(201).json(result);
        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(409).json({ message: 'Email already registered' });
            }
            next(error);
        }
    };

    exports.getProfile = async(req, res, next) => {
        try {
            const user = await authService.getUserProfile(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ message: 'User not found' });
            }
            next(error);
        }
    };