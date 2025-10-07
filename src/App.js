import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './AuthContext';

import Navbar from './components/Navbar';
import StudentProfiles from './components/StudentProfiles';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import LoginPage from './components/LoginPage';
import AboutSection from './components/AboutSection';
import Slider from './components/Slider';
import RecruitersSection from './components/RecruitersSection';
import ContactFooter from './components/ContactFooter';
import './App.css';

// This is a special component to protect routes that require a user to be logged in.
// If not logged in, it redirects them to the login page.
const ProtectedRoute = ({ children }) => {
    const { userToken } = useAuth();
    return userToken ? children : <Navigate to="/login" />;
};

// Component to group your homepage content
const HomePage = () => (
    <>
        <Slider />
        <AboutSection />
        <StudentProfiles />
        <RecruitersSection />
        <ContactFooter />
    </>
);

function App() {
    // IMPORTANT: Make sure your .env file in the frontend folder has this variable
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!GOOGLE_CLIENT_ID) {
        return <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>Error: REACT_APP_GOOGLE_CLIENT_ID is not set in your frontend .env file.</div>;
    }

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <UserDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </main>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;