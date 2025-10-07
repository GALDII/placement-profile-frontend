import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import { User, Mail, Code, Award, Github, Linkedin, Globe, Edit2, Save, X, Upload } from 'lucide-react';

// --- Skeleton Loader ---
const ProfileSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-300 mb-6"></div>
            <div className="h-8 w-48 bg-gray-300 rounded-md mb-3"></div>
            <div className="h-5 w-64 bg-gray-300 rounded-md mb-8"></div>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="h-16 w-full bg-gray-300 rounded-lg"></div>
            <div className="h-16 w-full bg-gray-300 rounded-lg"></div>
            <div className="h-16 w-full bg-gray-300 rounded-lg"></div>
        </div>
    </div>
);

// --- Inline Profile Form (No Overlay) ---
const InlineProfileForm = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: profile?.name || '',
        email: profile?.email || '',
        specialization: profile?.specialization || '',
        skills: profile?.skills || '',
        github: profile?.github || '',
        linkedin: profile?.linkedin || '',
        portfolio: profile?.portfolio || '',
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(profile?.photo_url || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        if (photoFile) {
            submitData.append('photo', photoFile);
        }

        await onSave(submitData);
        setIsSaving(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        <img
                            src={photoPreview || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <Upload className="w-8 h-8 text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Click to upload photo</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 inline mr-2" />
                        Specialization
                    </label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g., Data Science, Web Development"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Code className="w-4 h-4 inline mr-2" />
                        Skills
                    </label>
                    <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g., Python, React, Machine Learning"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Github className="w-4 h-4 inline mr-2" />
                            GitHub URL
                        </label>
                        <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Linkedin className="w-4 h-4 inline mr-2" />
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Globe className="w-4 h-4 inline mr-2" />
                            Portfolio URL
                        </label>
                        <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

// --- Main Dashboard Component ---
const UserDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { getAuthHeader, user } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/profiles/me`: 'http://localhost:5000/api/profiles/me';

    const fetchMyProfile = useCallback(async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const response = await fetch(API_URL, { headers: getAuthHeader() });

            if (response.status === 404) {
                setProfile({ name: user.name, email: user.email });
                setIsEditing(true);
            } else if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                throw new Error('Failed to fetch profile');
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [getAuthHeader, user]);

    useEffect(() => {
        fetchMyProfile();
    }, [fetchMyProfile]);

    const handleSaveProfile = async (formData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: getAuthHeader(),
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to save profile');
            setIsEditing(false);
            await fetchMyProfile();
        } catch (error) {
            console.error("Save operation failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 animate-fade-in">
                    My Dashboard
                </h1>

                {isLoading ? (
                    <ProfileSkeleton />
                ) : isEditing || !profile?.id ? (
                    <InlineProfileForm
                        profile={profile}
                        onSave={handleSaveProfile}
                        onCancel={profile?.id ? () => setIsEditing(false) : null}
                    />
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl animate-fade-in">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <img
                                src={profile.photo_url}
                                alt={profile.name}
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4"
                            />
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{profile.name}</h2>
                            <p className="text-md text-gray-500 mt-1">{profile.email}</p>
                        </div>

                        {/* Profile Details */}
                        <div className="max-w-2xl mx-auto space-y-4 mb-8">
                            <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                                <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Specialization</h3>
                                    <p className="text-gray-600">{profile.specialization || 'Not set'}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                                <Code className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Skills</h3>
                                    <p className="text-gray-600">{profile.skills || 'Not set'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-6 mb-8">
                            {profile.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-110"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            )}
                            {profile.portfolio && (
                                <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                >
                                    <Globe className="w-6 h-6" />
                                </a>
                            )}
                        </div>

                        {/* Edit Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                            >
                                <Edit2 className="w-5 h-5" />
                                Edit My Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default UserDashboard;