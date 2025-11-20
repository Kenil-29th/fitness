// client/src/screens/ContactUsScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ContactUsScreen = () => {
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
            textAlign: 'center',
        },
        contactInfo: {
            marginTop: '30px',
            listStyle: 'none',
            padding: 0,
        },
        contactItem: {
            marginBottom: '15px',
        },
        icon: {
            marginRight: '10px',
            color: '#007bff',
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
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
            <h2 style={styles.heading}>Contact Us</h2>
            <div style={styles.content}>
                <p>Have questions, feedback, or suggestions? We'd love to hear from you!</p>
                <ul style={styles.contactInfo}>
                    <li style={styles.contactItem}>
                        <span style={styles.icon}>✉️</span> Email: <a href="mailto:support@fitnessapp.com" style={styles.link}>support@fitnessapp.com</a>
                    </li>
                    <li style={styles.contactItem}>
                        <span style={styles.icon}>📞</span> Phone: +91 9313605123
                    </li>
                    <li style={styles.contactItem}>
                        <span style={styles.icon}>📍</span> Address: Gundlav Valsad, Gujarat
                    </li>
                </ul>
                <p>We strive to respond to all inquiries within 24-48 hours.</p>
            </div>
        </div>
    );
};

export default ContactUsScreen;