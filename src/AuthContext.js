import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

// This is the base URL for your backend. It uses the environment variable for production
// and falls back to localhost for local development.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [user, setUser] = useState(null);

    const getAuthHeader = () => {
        const token = localStorage.getItem('userToken');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 > Date.now()) {
                        // Token is valid, now fetch the full user profile with role from the backend
                        const response = await fetch(`${API_BASE_URL}/api/profiles/me`, {
                            headers: getAuthHeader()
                        });
                        if (response.ok) {
                            const profileData = await response.json();
                            setUser(profileData);
                        } else if (response.status === 404) {
                            // User is authenticated but has no profile yet in the database
                            setUser({ name: decoded.name, email: decoded.email, role: 'student', picture: decoded.picture });
                        } else {
                            // Another error occurred, log the user out
                            logout();
                        }
                    } else {
                        logout(); // Token is expired
                    }
                } catch (error) {
                    console.error("Auth initialization failed:", error);
                    logout();
                }
            }
        };
        fetchUser();
    }, [userToken]); // This effect now only depends on userToken

    const login = (token) => {
        localStorage.setItem('userToken', token);
        setUserToken(token); // This will trigger the useEffect to fetch the user's data
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, userToken, login, logout, getAuthHeader }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

