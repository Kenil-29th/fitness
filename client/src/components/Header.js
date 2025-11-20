import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const Header = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [userInfo, setUserInfo] = useState(null); // State to hold user info

    const navigate = useNavigate();

// Check user info from localStorage on component mount and whenever it might change
    useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
        } else {
            setUserInfo(null);
        }
    }, [navigate]); // navigate as dependency to avoid lint warning, though it doesn't change

// For now, re-checking localStorage on route change (via useEffect) is okay.
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null); // Clear user info from state
        navigate('/login'); // Redirect to login page after logout
}   ;

    const headerStyle = {
        backgroundColor: '#282c34',
        padding: '15px 20px', // Slightly adjusted padding
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'space-between', // Space out items
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    };

    const headerLeftContentStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        cursor: 'pointer', // Make the logo/title clickable
    };

    const logoStyle = {
        height: '45px', // Adjust logo size
        width: 'auto',
    };

    const appTitleStyle = {
        margin: 0,
        fontSize: '2.2em', // Adjust font size
        fontFamily: 'MyCustomFont, sans-serif', // Ensure 'MyCustomFont' is defined in index.css
        color: '#28a745', // Custom color
        letterSpacing: '1px', // Optional: adds slight spacing
    };

    const navContainerStyle = {
        position: 'relative', // For positioning the dropdown
        display: 'flex',
        alignItems: 'center',
    };

    const accountButtonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        whiteSpace: 'nowrap',
        alignItems:'right', // Prevents button text from wrapping
    };

    const dropdownMenuBaseStyle = {
        position: 'absolute',
        top: '100%', // Position below the button
        right: 0,
        backgroundColor: '#3a3e42', // Darker background for dropdown
        borderRadius: '5px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        zIndex: 1000,
        minWidth: '160px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 0',
        transform: isMenuOpen ? 'translateY(10px)' : 'translateY(-10px)', // Slight animation
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
    };

    const dropdownItemStyle = {
        color: 'white',
        padding: '12px 20px',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'left',
        fontSize: '0.95em',
        transition: 'background-color 0.2s ease',
    };

    // Note: Inline styles don't easily support :hover. You'd use a CSS file for that.
    // For a quick example, I'll put a slightly darker hover style directly for demonstration.
    const dropdownItemHoverStyle = {
        backgroundColor: '#555a60',
    };


    return (
        <header style={headerStyle}>
            <div style={headerLeftContentStyle} onClick={() => navigate('/')}> {/* Make logo/title area clickable */}
                <img src={logo} alt="Fitness App Logo" style={logoStyle} />
                <h1 style={appTitleStyle}>FitTrack Pro</h1>
            </div>

            <div
                style={navContainerStyle}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                {userInfo ? (
                    // If logged in, show username and Logout button
                    <>
                        <span style={{ color: 'white', marginRight: '15px', fontSize: '1.1em' }}>Hello, {userInfo.username}</span>
                        <button onClick={handleLogout} style={{ ...accountButtonStyle, backgroundColor: '#dc3545' }}>Logout</button>
                    </>
                ) : (
                    // If not logged in, show "Account" button with dropdown
                    <>
                        <button style={accountButtonStyle}>Account</button>
                        <div style={dropdownMenuBaseStyle}>
                            <Link to="/login" style={dropdownItemStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = dropdownItemHoverStyle.backgroundColor}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = dropdownItemStyle.backgroundColor}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                            >
                                Login
                            </Link>
                            <Link to="/register" style={dropdownItemStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = dropdownItemHoverStyle.backgroundColor}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = dropdownItemStyle.backgroundColor}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                            >
                                Register
                            </Link>
                        </div>
                    </>
                )}
        </div>
 </header>
);
};

export default Header;