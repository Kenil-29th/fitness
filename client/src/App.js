// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProgressScreen from './screens/ProgressScreen';
import ExerciseLibraryScreen from './screens/ExerciseLibraryScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import Footer from './components/Footer';
import Header from './components/Header'; // Import the new Header component

function App() {
  return (
    <Router>
      <div className="App" style={appContainerStyle}>
        <Header /> {/* Use the Header component here */}
        <main style={mainStyle}>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/progress" element={<ProgressScreen />} />
            <Route path="/exercises" element={<ExerciseLibraryScreen />} />
            <Route path="/contact" element={<ContactUsScreen />} />
            <Route path="/about" element={<AboutUsScreen />} />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// These styles are no longer needed for the header in App.js
// const headerStyle = { /* ... */ };
// const headerContentStyle = { /* ... */ };
// const logoStyle = { /* ... */ };
// const appTitleStyle = { /* ... */ };

const mainStyle = {
  padding: '20px',
  flexGrow: 1,
  backgroundColor: '#f0f2f5'
};

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export default App;