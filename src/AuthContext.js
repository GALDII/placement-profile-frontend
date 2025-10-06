import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Manages the raw JWT token string
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    // Manages the full user object, including their role from your database
    const [user, setUser] = useState(null);

    // Helper function to create the authorization header for API calls
    const getAuthHeader = () => {
        const token = localStorage.getItem('userToken');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // This effect runs whenever the app loads or the user logs in/out (token changes)
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    // Check if the token is expired
                    if (decoded.exp * 1000 > Date.now()) {
                        // Token is valid, now fetch the full user profile with their role from your backend
                        const response = await fetch('http://localhost:5000/api/profiles/me', {
                            headers: getAuthHeader()
                        });
                        
                        if (response.ok) {
                            const profileData = await response.json();
                            setUser(profileData); // User has a profile, store it
                        } else if (response.status === 404) {
                            // User is authenticated but has no profile yet in the database.
                            // We create a temporary user object with the role 'student'.
                            setUser({ name: decoded.name, email: decoded.email, role: 'student' });
                        }
                    } else {
                        // Token is expired, log them out
                        logout();
                    }
                } catch (error) {
                    console.error("Authentication initialization failed:", error);
                    logout(); // Log out on any error
                }
            }
        };
        fetchUser();
    }, [userToken]); // Re-run this effect when the token changes

    // Function to call when a user successfully logs in
    const login = (token) => {
        localStorage.setItem('userToken', token);
        setUserToken(token); // This will trigger the useEffect above to fetch the user's details
    };

    // Function to log the user out
    const logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUser(null);
    };

    // Provide the user object, token, and functions to the rest of the app
    return (
        <AuthContext.Provider value={{ user, userToken, login, logout, getAuthHeader }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily access the auth context in any component
export const useAuth = () => useContext(AuthContext);

