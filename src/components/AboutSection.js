import React, { useState, useEffect } from 'react';
import { GraduationCap, School, Trophy, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutSection = () => {
    const [achievementSlide, setAchievementSlide] = useState(0);
    const [eventSlide, setEventSlide] = useState(0);

    const achievements = [
        {
            src: process.env.PUBLIC_URL + '/assets/kiran.jpg',
            alt: 'Hackathon',
            title: 'Hackathon 2024',
            text: 'Winners of Inter-University Hackathon'
        },
        {
            src: process.env.PUBLIC_URL + '/assets/award.jpg',
            alt: 'Award',
            title: 'Excellence Award',
            text: 'Best Project Award in Data Science'
        },
        {
            src: process.env.PUBLIC_URL + '/assets/chethan.jpeg',
            alt: 'Competition',
            title: 'Coding Competition',
            text: 'Top performers in coding challenge'
        },
        ,
        {
            src: process.env.PUBLIC_URL + '/assets/Neostat hackathon.jpeg',
            alt: 'Competition',
            title: 'Coding Competition',
            text: 'Top performers in coding challenge'
        },
    ];

    const events = [
        {
            src: process.env.PUBLIC_URL + '/assets/IEE_grp_pht.jpeg',
            alt: 'IEEE Conference',
            title: 'IEEE CONFERENCE',
            text: 'Volunteers of the conference'
        },
        {
            src: process.env.PUBLIC_URL + '/assets/workshop2.jpeg',
            alt: 'Workshop',
            title: 'Net-Set Exam Workshop',
            text: 'Awareness of net and Set exam'
        },
        {
            src: process.env.PUBLIC_URL + '/assets/Workshop1.jpeg',
            alt: 'Workshop',
            title: 'Training Session',
            text: 'Skill development workshop'
        },
        {
            src: process.env.PUBLIC_URL + '/assets/me_ciya.jpg',
            alt: 'Workshop',
            title: 'Training Session',
            text: 'Skill development workshop'
        },
    ];

    const changeSlide = (type, direction) => {
        if (type === 'achievement') {
            setAchievementSlide(prev => (prev + direction + achievements.length) % achievements.length);
        } else {
            setEventSlide(prev => (prev + direction + events.length) % events.length);
        }
    };

    // Auto-slide
    useEffect(() => {
        const achievementInterval = setInterval(() => {
            setAchievementSlide(prev => (prev + 1) % achievements.length);
        }, 3000);
        
        const eventInterval = setInterval(() => {
            setEventSlide(prev => (prev + 1) % events.length);
        }, 3500);

        return () => {
            clearInterval(achievementInterval);
            clearInterval(eventInterval);
        };
    }, []);

    return (
        <section id="about" className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                        About the Program
                    </h1>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* 1. CHRIST University */}
                    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">CHRIST University</h2>
                        </div>
                        
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50">
                                <p className="font-bold text-gray-800 mb-1">Vision:</p>
                                <p className="text-gray-700">Excellence and Service</p>
                            </div>
                            
                            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/30">
                                <p className="font-bold text-gray-800 mb-1">Mission:</p>
                                <p className="text-gray-700 leading-relaxed">CHRIST (Deemed to be University) is a nurturing ground for an individual's holistic development to make effective contribution to the society in a dynamic environment.</p>
                            </div>

                            <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50/20">
                                <p className="font-bold text-gray-800 mb-2">Core Values:</p>
                                <ul className="space-y-1.5 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Faith in God</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Moral Uprightness</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Love of Fellow Beings</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Social Responsibility</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Pursuit of Excellence</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 2. MSc Data Science Programme */}
                    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <School className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">MSc Data Science</h2>
                        </div>
                        
                        <div className="space-y-4 text-gray-600">
                            <p>The Master of Data Science (MDS) is a postgraduate program that combines computer science and statistics to foster proficiency in data-driven decision-making. It is a two-year course comprising six trimesters.</p>
                            
                            <p>This programme aims to provide opportunity to all candidates to master the skill sets specific to data science with research bent. The curriculum supports students to obtain adequate knowledge in theory of data science with hands-on experience in relevant domains and tools.</p>
                            
                            <p>Candidates gain exposure to research models and industry standard applications through guest lectures, seminars, projects, and internships.</p>
                        </div>
                    </div>

                    {/* 3. Achievements & Awards Slider */}
                    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-lg h-64">
                                {achievements.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-500 ${
                                            index === achievementSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="text-lg font-bold">{slide.title}</h3>
                                            <p className="text-sm">{slide.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => changeSlide('achievement', -1)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-800" />
                            </button>
                            <button
                                onClick={() => changeSlide('achievement', 1)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-800" />
                            </button>

                            <div className="flex justify-center gap-2 mt-4">
                                {achievements.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setAchievementSlide(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === achievementSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4. Events Slider */}
                    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Events</h2>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-lg h-64">
                                {events.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-500 ${
                                            index === eventSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="text-lg font-bold">{slide.title}</h3>
                                            <p className="text-sm">{slide.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => changeSlide('event', -1)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-800" />
                            </button>
                            <button
                                onClick={() => changeSlide('event', 1)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-800" />
                            </button>

                            <div className="flex justify-center gap-2 mt-4">
                                {events.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setEventSlide(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === eventSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;