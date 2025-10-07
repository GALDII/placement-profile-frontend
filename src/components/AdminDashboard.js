import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import { 
    User, Mail, Code, Award, Github, Linkedin, Globe, 
    Edit2, Trash2, Plus, X, Upload, Search, Filter,
    ShieldAlert, CheckCircle2, XCircle, Users
} from 'lucide-react';

// --- Enhanced Profile Form Component (Modal) ---
export const ProfileForm = ({ profile, onSave, onCancel, isAdmin = false }) => {
    const [formData, setFormData] = useState({});
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(profile?.photo_url || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData({
            name: '', specialization: '', skills: '', github: '', linkedin: '', portfolio: '', email: '', ...profile
        });
        setPhotoPreview(profile?.photo_url || '');
    }, [profile]);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (photoFile) data.append('photo', photoFile);
        else if (profile?.photo_url) data.append('existing_photo_url', profile.photo_url);
        await onSave(data, profile?.id);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-scale-in">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <User className="w-6 h-6" />
                        {profile?.id ? 'Edit Profile' : 'Add New Profile'}
                    </h2>
                    <button 
                        onClick={onCancel}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Photo Upload Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                                <img
                                    src={photoPreview || 'https://via.placeholder.com/150'}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <Upload className="w-8 h-8 text-white" />
                                <input type="file" name="photo" onChange={handleFileChange} accept="image/*" className="hidden" />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Click to upload profile photo</p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name *
                            </label>
                            <input
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {isAdmin && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address *
                                </label>
                                <input
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    placeholder="john@msds.christuniversity.in"
                                    required
                                    disabled={!!profile?.id}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 disabled:cursor-not-allowed transition-all"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Award className="w-4 h-4 inline mr-2" />
                            Specialization
                        </label>
                        <input
                            name="specialization"
                            value={formData.specialization || ''}
                            onChange={handleChange}
                            placeholder="e.g., Data Science, Machine Learning"
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
                            value={formData.skills || ''}
                            onChange={handleChange}
                            placeholder="Python, React, TensorFlow, etc."
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Social Links
                        </h3>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Github className="w-4 h-4 inline mr-2" />
                                GitHub URL
                            </label>
                            <input
                                name="github"
                                value={formData.github || ''}
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
                                name="linkedin"
                                value={formData.linkedin || ''}
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
                                name="portfolio"
                                value={formData.portfolio || ''}
                                onChange={handleChange}
                                placeholder="https://yourportfolio.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Skeleton Loader ---
const ProfileCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
        <div className="p-5">
            <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-3"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
        </div>
    </div>
);

// --- Toast Notification ---
const Toast = ({ message, type, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3500);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const Icon = type === 'success' ? CheckCircle2 : XCircle;
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className={`fixed bottom-6 right-6 ${bgColor} text-white py-4 px-6 rounded-lg shadow-2xl animate-slide-in-up flex items-center gap-3 z-50`}>
            <Icon className="w-5 h-5" />
            <span className="font-medium">{message}</span>
            <button onClick={onDismiss} className="ml-2 hover:bg-white/20 rounded p-1">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

// --- Delete Confirmation Modal ---
const DeleteModal = ({ profile, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
            <div className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Delete Profile?</h3>
                <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to delete <span className="font-semibold">{profile?.name}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-all shadow-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Admin Dashboard ---
const AdminDashboard = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, getAuthHeader } = useAuth();

    const isAdminUser = user && user.role === 'admin';
    const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/profiles `: 'http://localhost:5000/api/profiles';


    const showToast = (message, type = 'success') => setToast({ message, type });

    const fetchProfiles = useCallback(async () => {
        if (!isAdminUser) { setIsLoading(false); return; }
        try {
            setIsLoading(true);
            const response = await fetch(API_URL, { headers: getAuthHeader() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setProfiles(data);
            setFilteredProfiles(data);
        } catch (error) {
            console.error("Failed to fetch profiles:", error);
            setProfiles([]);
            setFilteredProfiles([]);
            showToast('Failed to load profiles', 'error');
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    }, [getAuthHeader, isAdminUser]);

    useEffect(() => { if (user) fetchProfiles(); }, [user, fetchProfiles]);

    // Search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProfiles(profiles);
        } else {
            const filtered = profiles.filter(profile =>
                profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProfiles(filtered);
        }
    }, [searchTerm, profiles]);

    const handleSaveProfile = async (formData, id) => {
        const isEditing = !!id;
        const url = isEditing ? `${API_URL}/${id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, { method, headers: getAuthHeader(), body: formData });
            if (!response.ok) throw new Error('Save operation failed');
            setIsModalOpen(false);
            setEditingProfile(null);
            await fetchProfiles();
            showToast(`Profile ${isEditing ? 'updated' : 'created'} successfully!`);
        } catch (error) { 
            console.error("Save operation failed:", error);
            showToast('Failed to save profile', 'error');
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/${deleteTarget.id}`, { 
                method: 'DELETE', 
                headers: getAuthHeader() 
            });
            if (!response.ok) throw new Error('Delete operation failed');
            setDeleteTarget(null);
            await fetchProfiles();
            showToast('Profile deleted successfully!');
        } catch (error) { 
            console.error("Failed to delete profile:", error);
            showToast('Failed to delete profile', 'error');
        }
    };

    const handleAddNew = () => { setEditingProfile(null); setIsModalOpen(true); };
    const handleEdit = (profile) => { setEditingProfile(profile); setIsModalOpen(true); };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (!isAdminUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
                <div className="max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in-down">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-lg text-gray-600">You do not have permission to view this page. Admin access is required.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-lg text-gray-600">Manage all student profiles</p>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full sm:max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-green-700 hover:to-emerald-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Profile
                        </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <Filter className="w-4 h-4" />
                        <span>Showing {filteredProfiles.length} of {profiles.length} profiles</span>
                    </div>
                </div>

                {/* Profiles Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => <ProfileCardSkeleton key={index} />)}
                    </div>
                ) : filteredProfiles.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first profile'}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddNew}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                Add First Profile
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                        {filteredProfiles.map((profile) => (
                            <div
                                key={profile.id}
                                className="relative bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-center gap-3 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(profile)}
                                            className="bg-white text-blue-600 rounded-full w-12 h-12 flex justify-center items-center shadow-lg hover:scale-110 hover:bg-blue-50 transition-all"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(profile)}
                                            className="bg-white text-red-600 rounded-full w-12 h-12 flex justify-center items-center shadow-lg hover:scale-110 hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                    <img
                                        src={profile.photo_url}
                                        alt={profile.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Profile Info */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{profile.name}</h3>
                                    <p className="text-sm text-gray-500 truncate mb-2 flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {profile.email}
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-gray-700">
                                        <Award className="w-4 h-4 text-blue-600" />
                                        <span className="truncate">{profile.specialization || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {isModalOpen && (
                <ProfileForm
                    profile={editingProfile}
                    onSave={handleSaveProfile}
                    onCancel={() => { setIsModalOpen(false); setEditingProfile(null); }}
                    isAdmin={true}
                />
            )}
            {deleteTarget && (
                <DeleteModal
                    profile={deleteTarget}
                    onConfirm={handleDeleteProfile}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes slide-in-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
                .animate-slide-in-up { animation: slide-in-up 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;