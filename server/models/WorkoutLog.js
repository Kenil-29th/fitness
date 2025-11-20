// server/models/WorkoutLog.js
const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // References the User model
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise', // References the Exercise model (optional if it's a general log)
        default: null
    },
    exerciseName: { // Storing name directly for easier display if exercise gets deleted
        type: String,
        default: 'General Workout'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    durationMinutes: {
        type: Number,
        min: 1,
        default: null
    },
    sets: {
        type: Number,
        min: 1,
        default: null
    },
    reps: {
        type: Number,
        min: 1,
        default: null
    },
    weightLiftedKg: { // For strength exercises
        type: Number,
        default: null
    },
    notes: {
        type: String,
        default: ''
    },
    userWeightAtLog: { // User's recorded weight at the time of this log (for historical tracking)
        type: Number,
        default: null
    },
    userBMIAtLog: { // User's recorded BMI at the time of this log
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);