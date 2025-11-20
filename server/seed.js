// // server/seed.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Exercise = require('./models/Exercise');

// const exercises = [
//     {
//         name: 'Walking (Beginner Cardio)',
//         description: 'Gentle low-impact cardio, excellent for starting out or for higher BMIs. Focus on consistent pace.',
//         videoUrl: 'https://www.youtube.com/watch?v=TCsmCYbKzoY&pp=ygUrd2Fsa2luZyAoYmVnaW5uZXIgY2FyZGlvKSB3aXRob3V0IGNvcHlyaWdodA%3D%3D', // Example: Walking at Home for Beginners
//         category: 'cardio',
//         targetMuscles: [],
//         bmi_min: 25, // Suitable for overweight and obese
//         bmi_max: 50,
//         difficulty: 'beginner'
//     },
//     {
//         name: 'Bodyweight Squats',
//         description: 'Fundamental strength exercise for legs and glutes. Good for general fitness across many BMI ranges.',
//         videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ&pp=ygUjQm9keXdlaWdodCBTcXVhdHMgd2l0aG91dCBjb3B5cmlnaHQ%3D', // Example: How To Squat For Beginners
//         category: 'strength',
//         targetMuscles: ['quads', 'hamstrings', 'glutes'],
//         bmi_min: 18.5, // Standard healthy BMI
//         bmi_max: 35, // Can be done by some who are obese
//         difficulty: 'beginner'
//     },
//     {
//         name: 'Wall Push-Ups',
//         description: 'Modified push-ups against a wall, effective for building upper body strength for beginners, especially those with higher BMI.',
//         videoUrl: 'https://www.youtube.com/watch?v=b01muAD0_NI&pp=ygUgV2FsbCBQdXNoLVVwcyB3aXRob3V0IGNvcHlyaWdodCA%3D', // Example: Wall Push Ups For Beginners
//         category: 'strength',
//         targetMuscles: ['chest', 'shoulders', 'triceps'],
//         bmi_min: 25, // More suitable for higher BMIs or absolute beginners
//         bmi_max: 40,
//         difficulty: 'beginner'
//     },
//     {
//         name: 'Plank',
//         description: 'Core strengthening exercise. Focus on maintaining a straight line from head to heels. Requires some core stability.',
//         videoUrl: 'https://www.youtube.com/watch?v=6BUbbwf_TFE&pp=ygUYUGxhbmsgd2l0aG91dCBjb3B5cmlnaHQg', // Example: How To Do A Plank
//         category: 'bodyweight',
//         targetMuscles: ['core'],
//         bmi_min: 18.5,
//         bmi_max: 30, // May be challenging for very high BMIs
//         difficulty: 'intermediate'
//     },
//     {
//         name: 'Hamstring Stretch (Seated)',
//         description: 'Basic flexibility exercise for hamstrings. Important for overall mobility. Suitable for all BMIs.',
//         videoUrl: 'https://www.youtube.com/shorts/aJvfeuu71gw', // Example: Seated Hamstring Stretch
//         category: 'flexibility',
//         targetMuscles: ['hamstrings'],
//         bmi_min: 0, // No lower limit
//         bmi_max: 50, // No practical upper limit for this stretch
//         difficulty: 'beginner'
//     },
//     {
//         name: 'Burpees (High Intensity)',
//         description: 'Full-body explosive exercise for advanced cardio and strength. High impact.',
//         videoUrl: 'https://www.youtube.com/shorts/yOZfSdSFE9o', // Example: How to do a Burpee
//         category: 'cardio',
//         targetMuscles: ['full_body'],
//         bmi_min: 18.5,
//         bmi_max: 24.9, // Primarily for normal weight, high fitness
//         difficulty: 'advanced'
//     },
//     {
//         name: 'Jumping Jacks (High Intensity)',
//         description: 'Classic high-energy cardio exercise. Good for warm-ups or intense bursts.',
//         videoUrl: 'https://www.youtube.com/watch?v=Vfv084H00QI&pp=ygUxSnVtcGluZyBKYWNrcyAoSGlnaCBJbnRlbnNpdHkpIHdpdGhvdXQgY29weXJpZ2h0IA%3D%3D', // Example: How to do Jumping Jacks
//         category: 'cardio',
//         targetMuscles: ['full_body'],
//         bmi_min: 18.5,
//         bmi_max: 27, // Can be done by some overweight individuals but high impact
//         difficulty: 'intermediate'
//     },
//     {
//         name: 'Yoga (Sun Salutations)',
//         description: 'A sequence of poses for flexibility, strength, and mindfulness. Adaptable to many levels.',
//         videoUrl: 'https://www.youtube.com/watch?v=1xRX1MuoImw&pp=ygUpWW9nYSAoU3VuIFNhbHV0YXRpb25zKSB3aXRob3V0IGNvcHlyaWdodCA%3D', // Example: Sun Salutations for Beginners
//         category: 'yoga',
//         targetMuscles: ['full_body'],
//         bmi_min: 18.5,
//         bmi_max: 30,
//         difficulty: 'intermediate'
//     }
// ];

// const importData = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('MongoDB connected for seeding!');

//         await Exercise.deleteMany(); // Clear existing exercises to avoid duplicates on re-run
//         await Exercise.insertMany(exercises);
//         console.log('Data Imported!');
//         process.exit();
//     } catch (error) {
//         console.error(`${error.message}`);
//         process.exit(1);
//     }
// };

// importData();
// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

const exercises = [
    {
        name: 'Walking (Beginner Cardio)',
        description: 'Gentle low-impact cardio, excellent for starting out or for higher BMIs. Focus on consistent pace.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/TCsmCYbKzoY&pp=ygUrd2Fsa2luZyAoYmVnaW5uZXIgY2FyZGlvKSB3aXRob3V0IGNvcHlyaWdodA%3D%3D', // Example: "Walking at Home for Beginners"
        category: 'cardio',
        targetMuscles: [],
        bmi_min: 25,
        bmi_max: 50,
        difficulty: 'beginner'
    },
    {
        name: 'Bodyweight Squats',
        description: 'Fundamental strength exercise for legs and glutes. Good for general fitness across many BMI ranges.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/YaXPRqUwItQ&pp=ygUjQm9keXdlaWdodCBTcXVhdHMgd2l0aG91dCBjb3B5cmlnaHQ%3D', // Example: "How To Squat For Beginners"
        category: 'strength',
        targetMuscles: ['quads', 'hamstrings', 'glutes'],
        bmi_min: 18.5,
        bmi_max: 35,
        difficulty: 'beginner'
    },
    {
        name: 'Wall Push-Ups',
        description: 'Modified push-ups against a wall, effective for building upper body strength for beginners, especially those with higher BMI.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/b01muAD0_NI&pp=ygUgV2FsbCBQdXNoLVVwcyB3aXRob3V0IGNvcHlyaWdodCA%3D', // Example: "Wall Push Ups For Beginners"
        category: 'strength',
        targetMuscles: ['chest', 'shoulders', 'triceps'],
        bmi_min: 25,
        bmi_max: 40,
        difficulty: 'beginner'
    },
    {
        name: 'Plank',
        description: 'Core strengthening exercise. Focus on maintaining a straight line from head to heels. Requires some core stability.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/6BUbbwf_TFE&pp=ygUYUGxhbmsgd2l0aG91dCBjb3B5cmlnaHQg', // Example: "How To Do A Plank"
        category: 'bodyweight',
        targetMuscles: ['core'],
        bmi_min: 18.5,
        bmi_max: 30,
        difficulty: 'intermediate'
    },
    {
        name: 'Hamstring Stretch (Seated)',
        description: 'Basic flexibility exercise for hamstrings. Important for overall mobility. Suitable for all BMIs.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/aJvfeuu71gw', // Example: "Seated Hamstring Stretch"
        category: 'flexibility',
        targetMuscles: ['hamstrings'],
        bmi_min: 0,
        bmi_max: 50,
        difficulty: 'beginner'
    },
    {
        name: 'Burpees (High Intensity)',
        description: 'Full-body explosive exercise for advanced cardio and strength. High impact.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/yOZfSdSFE9o', // Example: "How to do a Burpee"
        category: 'cardio',
        targetMuscles: ['full_body'],
        bmi_min: 18.5,
        bmi_max: 24.9,
        difficulty: 'advanced'
    },
    {
        name: 'Jumping Jacks (High Intensity)',
        description: 'Classic high-energy cardio exercise. Good for warm-ups or intense bursts.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/Vfv084H00QI&pp=ygUxSnVtcGluZyBKYWNrcyAoSGlnaCBJbnRlbnNpdHkpIHdpdGhvdXQgY29weXJpZ2h0IA%3D%3D', // Example: "How to do Jumping Jacks"
        category: 'cardio',
        targetMuscles: ['full_body'],
        bmi_min: 18.5,
        bmi_max: 27,
        difficulty: 'intermediate'
    },
    {
        name: 'Yoga (Sun Salutations)',
        description: 'A sequence of poses for flexibility, strength, and mindfulness. Adaptable to many levels.',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1xRX1MuoImw&pp=ygUpWW9nYSAoU3VuIFNhbHV0YXRpb25zKSB3aXRob3V0IGNvcHlyaWdodCA%3D', // Example: "Sun Salutations for Beginners"
        category: 'yoga',
        targetMuscles: ['full_body'],
        bmi_min: 18.5,
        bmi_max: 30,
        difficulty: 'intermediate'
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding!');

        await Exercise.deleteMany();
        await Exercise.insertMany(exercises);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
};

importData();