import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
import { ShieldCheck, GraduationCap, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const allowedDomain = '@msds.christuniversity.in';

    const handleLoginSuccess = (credentialResponse) => {
        setError('');
        setIsLoading(true);
        const idToken = credentialResponse.credential;
        const decodedToken = jwtDecode(idToken);

        if (decodedToken.email && decodedToken.email.endsWith(allowedDomain)) {
            login(idToken);
            setTimeout(() => {
                navigate('/dashboard');
            }, 300);
        } else {
            setError(`Only users with a ${allowedDomain} email are allowed.`);
            setIsLoading(false);
        }
    };

    const handleLoginError = () => {
        setError('Google login failed. Please try again.');
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Header Section */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform">
                        <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        CHRIST University
                    </h1>
                    <p className="text-gray-600 font-medium">Student & Admin Portal</p>
                </div>

                {/* Main Login Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-all animate-fade-in-up border border-white/20">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-600 font-medium">Secure Login</p>
                    </div>

                    <p className="text-center text-gray-700 mb-8 leading-relaxed">
                        Sign in with your official CHRIST University account to access your dashboard
                    </p>

                    {/* Google Login Button Container */}
                    <div className="flex justify-center mb-6">
                        <div className={`transform transition-all duration-300 ${isLoading ? 'scale-95 opacity-50' : 'hover:scale-105'}`}>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                useOneTap
                                theme="filled_blue"
                                shape="rectangular"
                                size="large"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="animate-shake bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800 leading-relaxed">{error}</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center gap-2 text-blue-600 animate-pulse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                    )}

                    {/* Info Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                            Only authorized users with <span className="font-semibold text-gray-700">@msds.christuniversity.in</span> email addresses can access this portal
                        </p>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-600 mt-6 animate-fade-in animation-delay-600">
                    Need help? Contact your system administrator
                </p>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;