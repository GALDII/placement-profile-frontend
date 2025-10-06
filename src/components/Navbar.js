import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../App.css'; // Assuming your old styles for 'nav-button', etc., are here

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // State to control the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); // Close menu on logout
        navigate('/'); // Redirect to the homepage after logging out
    };

    // Function to close the menu, called when a link is clicked
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        // Using the simpler, non-Tailwind structure for the navbar
        <nav>
            <div className="logo">
                <Link to="/" onClick={handleLinkClick}>
                    <img src={'/assets/CHRIST_WHITE.png'} alt="University Logo" />
                </Link>
            </div>
            
            {/* The checkbox is now controlled by React state */}
            <input 
                type="checkbox" 
                id="menu-toggle" 
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>

            {/* Navigation Links */}
            <ul>
                {/* Each link now closes the menu when clicked */}
                <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
                <li><a href="/#about" onClick={handleLinkClick}>About</a></li>
                <li><a href="/#student-profiles" onClick={handleLinkClick}>Profiles</a></li>

                {/* Conditionally rendered links for logged-in users */}
                {user && <li><NavLink to="/dashboard" onClick={handleLinkClick}>My Dashboard</NavLink></li>}
                
                {/* Conditionally rendered link for admin users */}
                {user && user.role === 'admin' && (
                    <li><NavLink to="/admin" onClick={handleLinkClick}>Admin</NavLink></li>
                )}
            </ul>

            {/* User Actions: Login/Logout */}
            <div className="actions">
                {user ? (
                    // If a user is logged in, show their name and a logout button
                    <>
                        <span className="welcome-user">Welcome, {user.name}</span>
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    </>
                ) : (
                    // If no user is logged in, show a login button
                    <Link to="/login" className="nav-button" onClick={handleLinkClick}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

