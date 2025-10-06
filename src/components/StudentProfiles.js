import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../App.css';

const StudentProfiles = () => {
    // State to hold profiles fetched from the API
    const [profiles, setProfiles] = useState([]);
    // State for the search query
    const [searchQuery, setSearchQuery] = useState('');
    // State to handle loading status
    const [isLoading, setIsLoading] = useState(true);

    // Your backend API URL - UPDATED to the new public endpoint
    const API_URL = 'http://localhost:5000/api/public/profiles';

    // Function to fetch profiles from the server
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
                setProfiles([]); // Set to empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []); // The empty array [] means this effect runs once when the component mounts

    // Filter profiles based on the search query
    const filteredProfiles = profiles.filter(profile => {
        const query = searchQuery.toLowerCase();
        // Ensure all fields are strings before calling toLowerCase
        const name = profile.name || '';
        const specialization = profile.specialization || '';
        const skills = profile.skills || '';
        
        return (
            name.toLowerCase().includes(query) ||
            specialization.toLowerCase().includes(query) ||
            skills.toLowerCase().includes(query)
        );
    });

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div id="student-profiles">
            <h1>Student Profiles</h1>
            <div className="search-container">
                <input
                    type="text"
                    id="search-bar"
                    placeholder="Search by name, specialization, skills..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button id="search-button"><i className="fas fa-search"></i></button>
            </div>
            
            {isLoading ? <p className="loading-text">Loading profiles...</p> : (
                <div id="profiles-container" className="profiles-container">
                    {filteredProfiles.map((profile) => (
                        <div className="profile-card" key={profile.id}>
                            <div className="profile-image-container">
                                {/* Use the photo_url from the database */}
                                <img src={profile.photo_url} alt={profile.name} className="profile-image" />
                            </div>
                            <div className="profile-content">
                                <h3 className="profile-name">{profile.name}</h3>
                                <p className="profile-specialization">{profile.specialization}</p>
                                <p className="profile-skills"><strong>Skills:</strong> {profile.skills}</p>
                            </div>
                            <div className="social-media">
                                <a href={profile.github} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                                <a href={profile.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                                {profile.portfolio && (
                                    <a href={profile.portfolio} target="_blank" rel="noreferrer"><i className="fas fa-user"></i></a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentProfiles;
