import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
    }, [API_URL]); // Depend on API_URL

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

    return (
        <div id="student-profiles" className="p-4 sm:p-6 md:p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">Student Profiles</h1>
            <div className="max-w-md mx-auto mb-10">
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by name, specialization, skills..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            
            {isLoading ? <p className="text-center text-xl p-16 text-gray-500">Loading profiles...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {filteredProfiles.map((profile) => (
                        <div key={profile.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                             <div className="h-56">
                                <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-lg font-bold text-gray-900 truncate">{profile.name}</h3>
                                <p className="text-sm text-gray-600 capitalize h-10">{profile.specialization}</p>
                                <div className="mt-4 flex justify-center gap-4">
                                    <a href={profile.github} target="_blank" rel="noreferrer" className="text-xl text-gray-400 hover:text-gray-800"><i className="fab fa-github"></i></a>
                                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-xl text-gray-400 hover:text-blue-600"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentProfiles;

