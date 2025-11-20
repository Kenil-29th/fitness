import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProgressScreen = () => {
    const [exerciseName, setExerciseName] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weightLiftedKg, setWeightLiftedKg] = useState('');
    const [notes, setNotes] = useState('');
    const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchWorkoutLogs();
    }, [token, navigate]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const fetchWorkoutLogs = async () => {
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.get('/api/progress', config);
            setLogs(data);
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to fetch logs');
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axios.post(
                '/api/progress',
                {
                    exerciseName,
                    date: logDate,
                    durationMinutes: durationMinutes ? Number(durationMinutes) : null,
                    sets: sets ? Number(sets) : null,
                    reps: reps ? Number(reps) : null,
                    weightLiftedKg: weightLiftedKg ? Number(weightLiftedKg) : null,
                    notes,
                },
                config
            );
            setMessage('Workout logged successfully!');
            setExerciseName('');
            setDurationMinutes('');
            setSets('');
            setReps('');
            setWeightLiftedKg('');
            setNotes('');
            setLogDate(new Date().toISOString().split('T')[0]);
            fetchWorkoutLogs();
        } catch (err) {
            setError(err.response && err.response.data.msg ? err.response.data.msg : 'Failed to log workout');
        }
    };

    // New function to go back
    const goBack = () => {
        navigate(-1); // Navigates back one step in the history
    };

    const styles = {
        container: {
            maxWidth: '900px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #eee',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            position: 'relative', // For absolute positioning of back button
        },
        heading: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
        },
        formSection: {
            backgroundColor: '#e6f7ff',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #b3e0ff'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
        },
        textarea: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            minHeight: '80px',
            gridColumn: '1 / -1'
        },
        button: {
            gridColumn: '1 / -1',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '10px'
        },
        messages: {
            marginTop: '20px',
            padding: '10px',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold'
        },
        success: {
            backgroundColor: '#d4edda',
            color: '#155724'
        },
        error: {
            backgroundColor: '#f8d7da',
            color: '#721c24'
        },
        logsSection: {
            marginTop: '30px'
        },
        logCard: {
            backgroundColor: '#f0f2f5',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            textAlign: 'left'
        },
        logHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
        },
        logTitle: {
            fontSize: '1.2em',
            color: '#007bff',
            margin: 0
        },
        logDate: {
            fontSize: '0.9em',
            color: '#666'
        },
        logDetail: {
            fontSize: '0.95em',
            color: '#555',
            marginBottom: '5px'
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
            <h2 style={styles.heading}>Track Your Progress</h2>

            <div style={styles.formSection}>
                <h3 style={styles.heading}>Log a New Workout</h3>
                {message && <p style={{ ...styles.messages, ...styles.success }}>{message}</p>}
                {error && <p style={{ ...styles.messages, ...styles.error }}>{error}</p>}
                <form onSubmit={submitHandler}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label htmlFor="exerciseName" style={styles.label}>Exercise Name (e.g., Running, Weightlifting, Yoga)</label>
                            <input
                                type="text"
                                id="exerciseName"
                                value={exerciseName}
                                onChange={(e) => setExerciseName(e.target.value)}
                                style={styles.input}
                                placeholder="e.g., Bench Press, 30 min run"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="logDate" style={styles.label}>Date</label>
                            <input
                                type="date"
                                id="logDate"
                                value={logDate}
                                onChange={(e) => setLogDate(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="durationMinutes" style={styles.label}>Duration (minutes)</label>
                            <input
                                type="number"
                                id="durationMinutes"
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(e.target.value)}
                                style={styles.input}
                                min="1"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="sets" style={styles.label}>Sets</label>
                            <input
                                type="number"
                                id="sets"
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                                style={styles.input}
                                min="1"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="reps" style={styles.label}>Reps (per set)</label>
                            <input
                                type="number"
                                id="reps"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                                style={styles.input}
                                min="1"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label htmlFor="weightLiftedKg" style={styles.label}>Weight Lifted (kg)</label>
                            <input
                                type="number"
                                id="weightLiftedKg"
                                value={weightLiftedKg}
                                onChange={(e) => setWeightLiftedKg(e.target.value)}
                                style={styles.input}
                                min="0"
                                step="0.1"
                            />
                        </div>
                        <label htmlFor="notes" style={styles.label}>Notes</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={styles.textarea}
                            placeholder="Any specific observations or feelings about the workout?"
                        ></textarea>
                        <button type="submit" style={styles.button}>Log Workout</button>
                    </div>
                </form>
            </div>

            <div style={styles.logsSection}>
                <h3 style={styles.heading}>Your Workout History</h3>
                {loading ? (
                    <p>Loading logs...</p>
                ) : logs.length === 0 ? (
                    <p>No workout logs yet. Log your first workout!</p>
                ) : (
                    <div>
                        {logs.map((log) => (
                            <div key={log._id} style={styles.logCard}>
                                <div style={styles.logHeader}>
                                    <h4 style={styles.logTitle}>{log.exerciseName}</h4>
                                    <span style={styles.logDate}>{new Date(log.date).toLocaleDateString()}</span>
                                </div>
                                {log.durationMinutes && <p style={styles.logDetail}>Duration: {log.durationMinutes} minutes</p>}
                                {log.sets && <p style={styles.logDetail}>Sets: {log.sets}</p>}
                                {log.reps && <p style={styles.logDetail}>Reps: {log.reps}</p>}
                                {log.weightLiftedKg && <p style={styles.logDetail}>Weight Lifted: {log.weightLiftedKg} kg</p>}
                                {log.notes && <p style={styles.logDetail}>Notes: {log.notes}</p>}
                                {log.userWeightAtLog && <p style={styles.logDetail}>Logged Weight: {log.userWeightAtLog} kg</p>}
                                {log.userBMIAtLog && <p style={styles.logDetail}>Logged BMI: {log.userBMIAtLog}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressScreen;