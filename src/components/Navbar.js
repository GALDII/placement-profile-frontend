import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    const downloadBrochure = (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = '/assets/brochure.pdf';
        link.download = 'Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleLinkClick();
    };

    return (
        <nav className="bg-[#333] text-white shadow-lg">
            <div className="w-full px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={handleLinkClick}>
                            <img 
                                src="/assets/CHRIST_WHITE.png" 
                                alt="University Logo" 
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center ml-12">
                        <NavLink 
                            to="/" 
                            onClick={handleLinkClick}
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <a 
                            href="/#about" 
                            onClick={handleLinkClick}
                            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            About
                        </a>
                        <a 
                            href="/#student-profiles" 
                            onClick={handleLinkClick}
                            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Profiles
                        </a>
                        <a 
                            href="/#recruiters" 
                            onClick={handleLinkClick}
                            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Recruiters
                        </a>
                        <a 
                            href="/#contact" 
                            onClick={handleLinkClick}
                            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Contact
                        </a>

                        {/* Show Dashboard/Admin for logged in users */}
                        {user && (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    onClick={handleLinkClick}
                                    className={({ isActive }) => 
                                        `text-base font-medium transition-colors ${
                                            isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                        }`
                                    }
                                >
                                    My Dashboard
                                </NavLink>
                                {user.role === 'admin' && (
                                    <NavLink
                                        to="/admin"
                                        onClick={handleLinkClick}
                                        className={({ isActive }) => 
                                            `text-base font-medium transition-colors ${
                                                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                            }`
                                        }
                                    >
                                        Admin
                                    </NavLink>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right: Action Buttons + User Menu */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <button
                            onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSc9VL_2JkVTPG7hlCYIKI_etc_dS-qGmQTdQPOE0yuoH6dxSA/viewform?usp=header'}
                            className="px-5 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Recruit Students
                        </button>
                        <button
                            onClick={downloadBrochure}
                            className="px-5 py-2 rounded-md text-sm font-medium border border-white hover:bg-gray-700 transition-colors"
                        >
                            Brochure
                        </button>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                                >
                                    <span>Welcome, {user.name}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={handleLinkClick}
                                className="px-5 py-2 rounded-md text-sm font-medium border border-white hover:bg-gray-700 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <a
                            href="/#about"
                            onClick={handleLinkClick}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                        >
                            About
                        </a>
                        <a
                            href="/#student-profiles"
                            onClick={handleLinkClick}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                        >
                            Profiles
                        </a>
                        <a
                            href="/#recruiters"
                            onClick={handleLinkClick}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                        >
                            Recruiters
                        </a>
                        <a
                            href="/#contact"
                            onClick={handleLinkClick}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                        >
                            Contact
                        </a>
                        
                        {user && (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={handleLinkClick}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                                >
                                    My Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={handleLinkClick}
                                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                                    >
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="px-2 pt-2 pb-3 space-y-2 border-t border-gray-700">
                        <button
                            onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSc9VL_2JkVTPG7hlCYIKI_etc_dS-qGmQTdQPOE0yuoH6dxSA/viewform?usp=header'}
                            className="w-full px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-center"
                        >
                            Recruit Students
                        </button>
                        <button
                            onClick={downloadBrochure}
                            className="w-full px-4 py-2 rounded-md text-sm font-medium border border-white hover:bg-gray-700 transition-colors"
                        >
                            Download Brochure
                        </button>

                        {user ? (
                            <>
                                <div className="px-3 py-2 text-sm text-gray-300">
                                    Welcome, {user.name}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={handleLinkClick}
                                className="block w-full px-4 py-2 rounded-md text-sm font-medium border border-white hover:bg-gray-700 transition-colors text-center"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;