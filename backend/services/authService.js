const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Token generation
const generateToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            algorithm: 'HS256'
        }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }
    );
};

// Login
exports.loginUser = async(email, password) => {
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) throw new Error('USER_NOT_FOUND');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('INVALID_CREDENTIALS');

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token,
            refreshToken
        };
    } catch (error) {
        throw error;
    }
};

// Registration
exports.registerUser = async(username, email, password) => {
    try {
        if (password.length < 8) {
            throw new Error('PASSWORD_TOO_SHORT');
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) throw new Error('USER_EXISTS');

        const user = new User({ username, email: email.toLowerCase(), password });
        await user.save();

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token,
            refreshToken
        };
    } catch (error) {
        throw error;
    }
};

// Get user profile
exports.getUserProfile = async(userId) => {
    try {
        const user = await User.findById(userId)
            .select('-password -__v -createdAt');
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
    } catch (error) {
        throw error;
    }
};