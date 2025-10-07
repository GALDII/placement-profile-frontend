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

    return (
        <div id="student-profiles" className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4 sm:px-6 md:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                    <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
                    Student Profiles
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Discover talented students from our Data Science program
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md text-base"
                            placeholder="Search by name, specialization, or skills..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {searchQuery && (
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Filter className="w-4 h-4" />
                            <span>Showing {filteredProfiles.length} of {profiles.length} profiles</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-lg text-gray-600">Loading profiles...</p>
                </div>
            ) : filteredProfiles.length === 0 ? (
                /* Empty State */
                <div className="max-w-md mx-auto text-center py-20 bg-white rounded-2xl shadow-lg">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
                    <p className="text-gray-600">
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
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group border border-gray-100"
                            >
                                {/* Profile Image - Fixed Height */}
                                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                    <img
                                        src={profile.photo_url}
                                        alt={profile.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Profile Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                                        {profile.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-medium mb-4 h-10 flex items-center">
                                        {profile.specialization || 'Not specified'}
                                    </p>

                                    {/* Skills - Compact Display */}
                                    {profile.skills && (
                                        <div className="mb-4 pb-4 border-b border-gray-100">
                                            <p className="text-xs text-gray-500 font-semibold mb-2">SKILLS</p>
                                            <p className="text-sm text-gray-700 line-clamp-2">
                                                {profile.skills}
                                            </p>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-3">
                                        {profile.github && (
                                            <a
                                                href={profile.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-110"
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
                                                className="p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
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
                                                className="p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
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