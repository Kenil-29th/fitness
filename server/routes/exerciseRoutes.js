// server/routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Exercise = require('../models/Exercise');
const User = require('../models/User');

// @route   GET /api/exercises
// @desc    Get suggested exercises for authenticated user based on BMI
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userBMI = user ? user.bmi : null;

        let query = {};
        if (userBMI) {
            query = {
                bmi_min: { $lte: userBMI },
                bmi_max: { $gte: userBMI }
            };
        }

        const exercises = await Exercise.find(query);
        res.json(exercises);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/exercises/public
// @desc    Get all exercises with optional search, accessible without authentication
// @access  Public
router.get('/public', async (req, res) => {
    try {
        const { search } = req.query; // Get search term from query parameters

        let query = {};
        if (search) {
            // Case-insensitive search on name and description
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const exercises = await Exercise.find(query).sort({ name: 1 }); // Sort A-Z by name
        res.json(exercises);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;