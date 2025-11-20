import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            fetchUserProfile(parsedUserInfo.token);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fetchUserProfile = async (token) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/users/profile', config);
            setUserProfile(data);
            fetchExercises(token);
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to fetch profile');
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchExercises = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/exercises', config);
            setExercises(data);
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to fetch exercises');
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        setUserProfile(null);
        setExercises([]);
        navigate('/login');
    };

    const styles = {
        container: {
            maxWidth: '960px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #eee',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '1px solid #eee',
            paddingBottom: '20px'
        },
        heading: {
            color: '#28a745',
            margin: 0
        },
        navLinks: {
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
            fontSize: '1.1em',
            fontWeight: 'bold'
        },
        logoutButton: {
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1em',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        userInfoSection: {
            marginBottom: '30px',
            backgroundColor: '#e6f7ff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #b3e0ff'
        },
        bmiDisplay: {
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: '#007bff',
            marginBottom: '10px'
        },
        exerciseSection: {
            marginTop: '40px',
            textAlign: 'left'
        },
        exerciseGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
        },
        exerciseCard: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            backgroundColor: '#fff'
        },
        videoContainer: {
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden'
        },
        iframe: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
        },
        exerciseContent: {
            padding: '15px'
        },
        exerciseName: {
            fontSize: '1.4em',
            color: '#333',
            marginBottom: '10px'
        },
        exerciseDescription: {
            fontSize: '0.9em',
            color: '#666',
            marginBottom: '10px'
        },
        exerciseDetails: {
            fontSize: '0.85em',
            color: '#888',
            marginBottom: '5px'
        },
        noData: {
            color: '#888',
            fontSize: '1.1em'
        },
        errorMsg: {
            color: 'red',
            marginTop: '20px'
        }
    };

    if (loading) return <div style={styles.container}>Loading profile...</div>;
    if (error) return <div style={{...styles.container, ...styles.errorMsg}}>Error: {error}</div>;
    if (!userInfo) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.heading}>Welcome, {userInfo.username}!</h1>
                <div style={styles.navLinks}>
                    <Link to="/profile" style={styles.link}>Update Profile</Link>
                    <Link to="/progress" style={styles.link}>Track Progress</Link> {/* New Link */}
                    <button onClick={logoutHandler} style={styles.logoutButton}>Logout</button>
                </div>
            </div>

            {userProfile && (
                <div style={styles.userInfoSection}>
                    <p style={styles.bmiDisplay}>
                        Your BMI: {userProfile.bmi ? userProfile.bmi : 'Not calculated (Please update weight & height in profile)'}
                    </p>
                    <p>Weight: {userProfile.weight ? `${userProfile.weight} kg` : 'N/A'}</p>
                    <p>Height: {userProfile.height ? `${userProfile.height} cm` : 'N/A'}</p>
                    <p>Age: {userProfile.age || 'N/A'}</p>
                    <p>Gender: {userProfile.gender || 'N/A'}</p>
                    <p>Activity Level: {userProfile.activityLevel ? userProfile.activityLevel.replace('_', ' ') : 'N/A'}</p>
                </div>
            )}

            <div style={styles.exerciseSection}>
                <h2 style={styles.heading}>Suggested Exercises</h2>
                {exercises.length === 0 && userProfile && userProfile.bmi ? (
                    <p style={styles.noData}>
                        No exercises found for your BMI. Please update your profile or try different parameters.
                    </p>
                ) : exercises.length === 0 && (!userProfile || !userProfile.bmi) ? (
                    <p style={styles.noData}>
                        Please update your weight and height in your <Link to="/profile">profile</Link> to get personalized exercise suggestions.
                    </p>
                ) : (
                    <div style={styles.exerciseGrid}>
                        {exercises.map((exercise) => (
                            <div key={exercise._id} style={styles.exerciseCard}>
                                <div style={styles.videoContainer}>
                                    <iframe
                                        style={styles.iframe}
                                        src={exercise.videoUrl}
                                        title={exercise.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div style={styles.exerciseContent}>
                                    <h3 style={styles.exerciseName}>{exercise.name}</h3>
                                    <p style={styles.exerciseDescription}>{exercise.description}</p>
                                    <p style={styles.exerciseDetails}><strong>Category:</strong> {exercise.category}</p>
                                    {exercise.targetMuscles.length > 0 && (
                                        <p style={styles.exerciseDetails}><strong>Target Muscles:</strong> {exercise.targetMuscles.join(', ')}</p>
                                    )}
                                    <p style={styles.exerciseDetails}><strong>Difficulty:</strong> {exercise.difficulty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;