const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const conditionRoutes = require('./routes/conditionRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Request logging
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});

// Enhanced JSON parsing middleware
app.use(express.json({
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf.toString());
        } catch (e) {
            return res.status(400).json({ error: "Invalid JSON format" });
            // No throw statement here
        }
    },
    limit: '10mb'
}));

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/conditions', conditionRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));