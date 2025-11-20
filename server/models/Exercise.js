const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: { // URL to the exercise video (e.g., YouTube embed URL)
        type: String,
        required: true
    },
    category: { // e.g., 'cardio', 'strength', 'flexibility', 'yoga'
        type: String,
        required: true,
        enum: ['cardio', 'strength', 'flexibility', 'yoga', 'bodyweight']
    },
    targetMuscles: [{ // e.g., 'chest', 'legs', 'core'
        type: String
    }],
    bmi_min: { // Minimum BMI for this exercise to be suggested
        type: Number,
        default: 0 // Assume no lower limit by default
    },
    bmi_max: { // Maximum BMI for this exercise to be suggested
        type: Number,
        default: 100 // Assume no upper limit by default
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    image: { // Optional: URL to an image for the exercise
        type: String
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);