const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Function to calculate BMI
const calculateBMI = (weightKg, heightCm) => {
    if (!weightKg || !heightCm || heightCm === 0) return null;
    const heightMeters = heightCm / 100;
    return (weightKg / (heightMeters * heightMeters)).toFixed(2); // BMI = kg/m^2
};

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                weight: user.weight,
                height: user.height,
                age: user.age,
                gender: user.gender,
                activityLevel: user.activityLevel,
                bmi: user.bmi
            });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile and calculate BMI
// @access  Private
router.put('/profile', protect, async (req, res) => {
    const { username, email, weight, height, age, gender, activityLevel } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = username || user.username;
            user.email = email || user.email; // Be careful with email changes, usually require re-verification
            user.weight = weight || user.weight;
            user.height = height || user.height;
            user.age = age || user.age;
            user.gender = gender || user.gender;
            user.activityLevel = activityLevel || user.activityLevel;

            // Calculate BMI if weight and height are provided
            if (user.weight && user.height) {
                user.bmi = calculateBMI(user.weight, user.height);
            } else {
                user.bmi = null; // Clear BMI if data is incomplete
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                weight: updatedUser.weight,
                height: updatedUser.height,
                age: updatedUser.age,
                gender: updatedUser.gender,
                activityLevel: updatedUser.activityLevel,
                bmi: updatedUser.bmi,
            });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        // Handle unique constraint errors for email/username if user tries to update to an existing one
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'Username or Email already exists' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;