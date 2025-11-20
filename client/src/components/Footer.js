// client/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: '#282c34', // Dark background
            color: 'white',
            padding: '30px 20px',
            textAlign: 'center',
            marginTop: '50px', // Space from content above
            boxShadow: '0 -2px 5px rgba(0,0,0,0.2)', // Shadow at the top
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px', // Ensure a decent height
        },
        linksContainer: {
            marginBottom: '15px',
        },
        link: {
            color: '#a0d9ff', // Lighter blue for links
            textDecoration: 'none',
            margin: '0 15px',
            fontSize: '1.05em',
            transition: 'color 0.3s ease',
        },
        linkHover: { // Not directly used with inline styles for hover
            color: '#ffffff',
        },
        infoText: {
            fontSize: '0.9em',
            color: '#bbb',
            maxWidth: '700px', // Limit width for readability
            lineHeight: '1.5',
            marginBottom: '15px',
        },
        copyright: {
            fontSize: '0.85em',
            color: '#888',
        },
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.linksContainer}>
                <Link to="/about" style={styles.link}>About Us</Link>
                <Link to="/contact" style={styles.link}>Contact Us</Link>
                <Link to="/exercises" style={styles.link}>Exercise Library</Link> {/* Also good to add here */}
            </div>
            <p style={styles.infoText}>
                This Fitness App helps you achieve your health goals with personalized exercise suggestions based on your BMI, a comprehensive exercise library with videos, and robust progress tracking. Your journey to a healthier lifestyle starts here!
            </p>
            <p style={styles.copyright}>&copy; {new Date().getFullYear()} Fitness App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;