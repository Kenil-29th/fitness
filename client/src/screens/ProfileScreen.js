import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [weight, setWeight] = useState(''); // kg
    const [height, setHeight] = useState(''); // cm
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/users/profile', config);

                setUsername(data.username);
                setEmail(data.email);
                setWeight(data.weight || '');
                setHeight(data.height || '');
                setAge(data.age || '');
                setGender(data.gender || '');
                setActivityLevel(data.activityLevel || '');
                setBmi(data.bmi);
            } catch (err) {
                setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to fetch profile');
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('userInfo');
                    navigate('/login');
                }
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put(
                '/api/users/profile',
                { username, email, weight: Number(weight), height: Number(height), age: Number(age), gender, activityLevel },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));

            setBmi(data.bmi);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to update profile');
        }
    };

    // New function to go back
    const goBack = () => {
        navigate(-1); // Navigates back one step in the history
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9',
            position: 'relative', // For absolute positioning of back button
        },
        heading: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
        },
        select: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: 'white',
        },
        button: {
            gridColumn: '1 / -1',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '15px',
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
        bmiDisplay: {
            textAlign: 'center',
            marginTop: '20px',
            padding: '15px',
            border: '1px dashed #007bff',
            borderRadius: '8px',
            backgroundColor: '#e6f7ff',
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: '#007bff',
        },
        backButton: { // New style for the back button
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
            <button onClick={goBack} style={styles.backButton}>&larr; Back</button> {/* Back button */}
            <h2 style={styles.heading}>User Profile</h2>
            {message && <p style={{ ...styles.message, ...styles.success }}>{message}</p>}
            {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}

            <form onSubmit={submitHandler} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
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
                    <label htmlFor="weight" style={styles.label}>Weight (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        style={styles.input}
                        min="1"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="height" style={styles.label}>Height (cm)</label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={styles.input}
                        min="1"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="age" style={styles.label}>Age</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={styles.input}
                        min="1"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="gender" style={styles.label}>Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="activityLevel" style={styles.label}>Activity Level</label>
                    <select
                        id="activityLevel"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select Activity Level</option>
                        <option value="sedentary">Sedentary (little to no exercise)</option>
                        <option value="lightly_active">Lightly active (light exercise/sports 1-3 days/week)</option>
                        <option value="moderately_active">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                        <option value="very_active">Very active (hard exercise/sports 6-7 days/week)</option>
                        <option value="extra_active">Extra active (very hard exercise/physical job)</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Update Profile</button>
            </form>
            {bmi && (
                <div style={styles.bmiDisplay}>
                    Your Current BMI: {bmi}
                </div>
            )}
        </div>
    );
};

export default ProfileScreen;