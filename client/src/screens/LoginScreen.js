// client/src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                '/api/auth/login',
                { email, password },
                config
            );

            setMessage('Login successful!');
            localStorage.setItem('userInfo', JSON.stringify(data)); // Store user info
            navigate('/'); // Redirect to home screen
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Login failed');
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            color: '#333',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        label: {
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: { // Not directly used with inline styles for hover
            backgroundColor: '#0056b3',
        },
        message: {
            marginTop: '20px',
            padding: '10px',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        success: {
            backgroundColor: '#d4edda',
            color: '#155724',
        },
        error: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
        },
        footer: {
            marginTop: '20px',
            fontSize: '1em',
            color: '#666',
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            {message && <p style={{ ...styles.message, ...styles.success }}>{message}</p>}
            {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}

            <form onSubmit={submitHandler} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>

            <div style={styles.footer}>
                New Customer? <Link to="/register" style={styles.link}>Register Here</Link>
            </div>
            {/* NEW LINK ADDED HERE */}
            <div style={styles.footer}>
                Want to explore exercises? <Link to="/exercises" style={styles.link}>View Exercise Library</Link>
            </div>
        </div>
    );
};

export default LoginScreen;