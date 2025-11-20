// server/routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const WorkoutLog = require('../models/WorkoutLog');
const User = require('../models/User'); // To get current user weight/BMI

// @route   POST /api/progress
// @desc    Log a new workout/progress entry
// @access  Private
router.post('/', protect, async (req, res) => {
    const { exerciseId, exerciseName, date, durationMinutes, sets, reps, weightLiftedKg, notes } = req.body;

    try {
        const user = await User.findById(req.user._id); // Get current user's profile

        const newLog = new WorkoutLog({
            user: req.user._id,
            exercise: exerciseId || null, // Optional
            exerciseName: exerciseName || 'General Workout',
            date: date || Date.now(),
            durationMinutes,
            sets,
            reps,
            weightLiftedKg,
            notes,
            userWeightAtLog: user ? user.weight : null, // Record user's current weight
            userBMIAtLog: user ? user.bmi : null,       // Record user's current BMI
        });

        const createdLog = await newLog.save();
        res.status(201).json(createdLog);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/progress
// @desc    Get all workout logs for the authenticated user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const logs = await WorkoutLog.find({ user: req.user._id })
                                     .sort({ date: -1 }) // Sort by date, newest first
                                     .populate('exercise', 'name'); // Populate exercise name if linked

        res.json(logs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/progress/history
// @desc    Get historical weight and BMI for charting
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const history = await WorkoutLog.find({ user: req.user._id })
                                        .select('date userWeightAtLog userBMIAtLog')
                                        .sort({ date: 1 }); // Sort oldest first for charts

        const weightData = history.filter(log => log.userWeightAtLog !== null).map(log => ({
            date: log.date.toISOString().split('T')[0], // YYYY-MM-DD
            value: log.userWeightAtLog
        }));

        const bmiData = history.filter(log => log.userBMIAtLog !== null).map(log => ({
            date: log.date.toISOString().split('T')[0],
            value: log.userBMIAtLog
        }));

        res.json({ weightData, bmiData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;