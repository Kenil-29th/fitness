// client/src/screens/ExerciseLibraryScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to use for buttons

const ExerciseLibraryScreen = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // Debounce search term to prevent too many API calls
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            setError('');
            try {
                const { data } = await axios.get(`/api/exercises/public?search=${debouncedSearchTerm}`);
                setExercises(data);
            } catch (err) {
                setError('Failed to fetch exercises. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [debouncedSearchTerm]);

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #eee',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        },
        header: {
            textAlign: 'center',
            marginBottom: '30px',
        },
        heading: {
            color: '#28a745',
            fontSize: '2.5em',
            marginBottom: '10px',
        },
        description: {
            color: '#666',
            fontSize: '1.1em',
            marginBottom: '20px',
        },
        searchContainer: {
            marginBottom: '30px',
            textAlign: 'center',
        },
        searchInput: {
            padding: '12px 20px',
            fontSize: '1.1em',
            width: '80%',
            maxWidth: '500px',
            border: '2px solid #007bff',
            borderRadius: '25px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        exerciseGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '25px',
            marginTop: '20px',
        },
        exerciseCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease-in-out',
        },
        exerciseCardHover: {
            transform: 'translateY(-5px)',
        },
        videoContainer: {
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
            backgroundColor: '#000',
        },
        iframe: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        },
        exerciseContent: {
            padding: '20px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        exerciseName: {
            fontSize: '1.5em',
            color: '#333',
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        exerciseDescription: {
            fontSize: '0.95em',
            color: '#666',
            marginBottom: '15px',
            lineHeight: '1.5',
        },
        exerciseDetails: {
            fontSize: '0.85em',
            color: '#888',
            marginBottom: '5px',
        },
        authSection: { // Style for the authentication prompt section
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '1.1em',
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
        },
        authButtons: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
        },
        authButton: { // Style for the login/register buttons
            padding: '12px 25px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
        },
        loginButton: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        registerButton: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        authButtonHover: { // Not directly used with inline styles for hover
            transform: 'translateY(-2px)',
            opacity: 0.9,
        },
        errorMsg: {
            color: 'red',
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.1em',
        },
        loadingMsg: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.1em',
            color: '#555',
        },
        noResults: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.2em',
            color: '#888',
            gridColumn: '1 / -1',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.heading}>A-Z Exercise Library</h1>
                <p style={styles.description}>Explore a wide range of exercises. No login required!</p>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search exercises by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {loading ? (
                <p style={styles.loadingMsg}>Loading exercises...</p>
            ) : error ? (
                <p style={styles.errorMsg}>Error: {error}</p>
            ) : exercises.length === 0 ? (
                <p style={styles.noResults}>No exercises found matching your search. Try a different term!</p>
            ) : (
                <div style={styles.exerciseGrid}>
                    {exercises.map((exercise) => (
                        <div key={exercise._id} style={styles.exerciseCard}>
                            {exercise.videoUrl && (
                                <div style={styles.videoContainer}>
                                    <iframe
                                        style={styles.iframe}
                                        src={exercise.videoUrl}
                                        title={exercise.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <div style={styles.exerciseContent}>
                                <h3 style={styles.exerciseName}>{exercise.name}</h3>
                                <p style={styles.exerciseDescription}>{exercise.description}</p>
                                <p style={styles.exerciseDetails}><strong>Category:</strong> {exercise.category}</p>
                                {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
                                    <p style={styles.exerciseDetails}><strong>Target Muscles:</strong> {exercise.targetMuscles.join(', ')}</p>
                                )}
                                <p style={styles.exerciseDetails}><strong>Difficulty:</strong> {exercise.difficulty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

           
        </div>
    );
};

export default ExerciseLibraryScreen;