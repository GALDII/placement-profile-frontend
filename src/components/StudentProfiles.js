import React, { useState, useEffect } from 'react';
import { Search, Github, Linkedin, Globe, Filter, Users } from 'lucide-react';
import '../App.css';

const StudentProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Use the environment variable for the API URL, with localhost as a fallback for development
    const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/public/profiles`;

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                console.error("Failed to fetch profiles:", error);
                setProfiles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, [API_URL]);

    const filteredProfiles = profiles.filter(profile => {
        const query = searchQuery.toLowerCase();
        const name = profile.name || '';
        const specialization = profile.specialization || '';
        const skills = profile.skills || '';
        
        return (
            name.toLowerCase().includes(query) ||
            specialization.toLowerCase().includes(query) ||
            skills.toLowerCase().includes(query)
        );
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCardClick = (portfolioUrl, e) => {
        // Check if the click was on a social link or its children
        if (e.target.closest('.social-links')) {
            return; // Don't navigate if clicking on social links
        }
        
        if (portfolioUrl) {
            window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div id="student-profiles" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '4rem 1rem' }}>
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)' }}>
                    <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: '#333' }}>
                    Student Profiles
                </h1>
                <p className="text-lg mb-8" style={{ color: '#666' }}>
                    Discover talented students from our Data Science program
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#999' }} />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-base transition-all"
                            style={{
                                border: '2px solid #e0e0e0',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}
                            placeholder="Search by name, specialization, or skills..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#4a90e2';
                                e.target.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e0e0e0';
                                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                            }}
                        />
                    </div>
                    {searchQuery && (
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm" style={{ color: '#666' }}>
                            <Filter className="w-4 h-4" />
                            <span>Showing {filteredProfiles.length} of {profiles.length} profiles</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 rounded-full animate-spin mb-4" style={{
                        border: '4px solid #e0e0e0',
                        borderTopColor: '#4a90e2'
                    }}></div>
                    <p className="text-lg" style={{ color: '#666' }}>Loading profiles...</p>
                </div>
            ) : filteredProfiles.length === 0 ? (
                /* Empty State */
                <div className="max-w-md mx-auto text-center py-20 rounded-2xl shadow-lg" style={{ backgroundColor: 'white' }}>
                    <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#999' }} />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#333' }}>No profiles found</h3>
                    <p style={{ color: '#666' }}>
                        {searchQuery ? 'Try adjusting your search terms' : 'No student profiles available yet'}
                    </p>
                </div>
            ) : (
                /* Profiles Grid */
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                        {filteredProfiles.map((profile) => (
                            <div
                                key={profile.id}
                                onClick={(e) => handleCardClick(profile.portfolio, e)}
                                className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group border"
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#e0e0e0',
                                    cursor: profile.portfolio ? 'pointer' : 'default'
                                }}
                            >
                                {/* Profile Image - Fixed Height */}
                                <div className="relative h-72 overflow-hidden" style={{ backgroundColor: '#f0f0f0' }}>
                                    <img
                                        src={profile.photo_url}
                                        alt={profile.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }}
                                    ></div>
                                </div>

                                {/* Profile Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2 truncate group-hover:transition-colors" style={{ color: '#333' }}>
                                        {profile.name}
                                    </h3>
                                    <p className="text-sm font-medium mb-4 h-10 flex items-center" style={{ color: '#4a90e2' }}>
                                        {profile.specialization || 'Not specified'}
                                    </p>

                                    {/* Skills - Compact Display */}
                                    {profile.skills && (
                                        <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <p className="text-xs font-semibold mb-2" style={{ color: '#999', letterSpacing: '0.5px' }}>SKILLS</p>
                                            <p className="text-sm line-clamp-2" style={{ color: '#555' }}>
                                                {profile.skills}
                                            </p>
                                        </div>
                                    )}

                                    {/* Social Links - This div won't trigger card navigation */}
                                    <div className="flex justify-center gap-3 social-links">
                                        {profile.github && (
                                            <a
                                                href={profile.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#333';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                                    e.currentTarget.style.color = '#666';
                                                }}
                                                title="GitHub"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {profile.linkedin && (
                                            <a
                                                href={profile.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#0077b5';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                                    e.currentTarget.style.color = '#666';
                                                }}
                                                title="LinkedIn"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {profile.portfolio && (
                                            <a
                                                href={profile.portfolio}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#4a90e2';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                                    e.currentTarget.style.color = '#666';
                                                }}
                                                title="Portfolio"
                                            >
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default StudentProfiles;