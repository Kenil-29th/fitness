// client/src/screens/AboutUsScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutUsScreen = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigates back one step in the history
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #eee',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
        },
        content: {
            fontSize: '1.1em',
            lineHeight: '1.6',
            color: '#555',
            textAlign: 'justify',
        },
        highlight: {
            fontWeight: 'bold',
            color: '#28a745',
        },
        backButton: {
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: '#6c757d', // Grey color
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.3s ease',
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={goBack} style={styles.backButton}>&larr; Back</button>
            <h2 style={styles.heading}>About Our Fitness App</h2>
            <div style={styles.content}>
                <p>Welcome to our <span style={styles.highlight}>Fitness App</span>! Our mission is to empower individuals on their health and wellness journey by providing personalized exercise recommendations and tools to track their progress.</p>
                <p>We believe that fitness should be accessible and tailored to everyone. That's why our app utilizes your **Body Mass Index (BMI)** to suggest exercises that are safe, effective, and appropriate for your current physical condition.</p>
                <p>Key features include:</p>
                <ul>
                    <li>**Personalized Exercise Suggestions:** Based on your BMI, receive tailored workout routines.</li>
                    <li>**Comprehensive Exercise Library:** Explore a wide variety of exercises with detailed descriptions and video demonstrations.</li>
                    <li>**Progress Tracking:** Log your workouts, monitor your weight and BMI trends, and celebrate your achievements over time.</li>
                    <li>**User-Friendly Interface:** Enjoy a clean and intuitive design that makes your fitness journey straightforward and enjoyable.</li>
                </ul>
                <p>Start your journey towards a healthier, happier you today!</p>
            </div>
        </div>
    );
};

export default AboutUsScreen;