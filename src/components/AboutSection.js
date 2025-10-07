import React, { useState } from 'react';
import { 
    GraduationCap, School, Laptop, Briefcase, 
    ChevronLeft, ChevronRight, Heart, Target, Award 
} from 'lucide-react';
import '../App.css';

const AboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: process.env.PUBLIC_URL + '/assets/IEE_grp_pht.jpeg',
            alt: 'IEE Conference',
            title: 'IEE CONFERENCE',
            text: 'Volunteers of the conference',
        },
        {
            src: process.env.PUBLIC_URL + '/assets/workshop2.jpeg',
            alt: 'Net-set Exam Awareness',
            title: 'Net-Set Exam',
            text: 'Awareness of net and Set exam',
        },
        {
            src: process.env.PUBLIC_URL + '/assets/Workshop1.jpeg',
            alt: 'Net-set Exam Awareness',
            title: 'Net-Set Exam',
            text: 'Awareness of net and Set exam',
        },
    ];

    const changeSlide = (direction) => {
        setCurrentSlide((prev) => (prev + direction + slides.length) % slides.length);
    };

    const coreValues = [
        { icon: Heart, text: 'Faith in God' },
        { icon: Target, text: 'Moral Uprightness' },
        { icon: Heart, text: 'Love of Fellow Beings' },
        { icon: Award, text: 'Social Responsibility' },
        { icon: Award, text: 'Pursuit of Excellence' },
    ];

    return (
        <section id="about" style={{ backgroundColor: '#f9f9f9', padding: '4rem 1rem' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: '#333' }}>
                        About the Program
                    </h1>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#4a90e2' }}></div>
                </div>

                {/* First Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* CHRIST University */}
                    <div 
                        className="rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                            style={{ backgroundColor: '#4a90e2' }}
                        >
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: '#4a90e2' }}>
                            About CHRIST University
                        </h2>
                        
                        <div className="space-y-3 mb-4">
                            <div>
                                <p className="font-semibold mb-1" style={{ color: '#333' }}>Vision:</p>
                                <p style={{ color: '#666' }}>Excellence and Service</p>
                            </div>
                            
                            <div>
                                <p className="font-semibold mb-1" style={{ color: '#333' }}>Mission:</p>
                                <p style={{ color: '#666' }}>
                                    CHRIST (Deemed to be University) is a nurturing ground for an individual's holistic development to make effective contribution to the society in a dynamic environment.
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold mb-3" style={{ color: '#333' }}>Core Values:</p>
                            <div className="space-y-2">
                                {coreValues.map((value, index) => {
                                    const Icon = value.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#4a90e2' }} />
                                            <span style={{ color: '#555' }}>{value.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Yeshwanthpur Campus */}
                    <div 
                        className="rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                            style={{ backgroundColor: '#4a90e2' }}
                        >
                            <School className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: '#4a90e2' }}>
                            About the Bangalore Yeshwanthpur Campus
                        </h2>
                        <p className="leading-relaxed" style={{ color: '#666' }}>
                            CHRIST Yeshwanthpur Campus is next to Dasrahalli/Nagasandra Metro Stations on Tumkur Road, 5 kms from Yeswanthpur Railway station, upholding the Vision, Excellence and Service Core Values, with innovative and contemporary curricula and pedagogy.
                        </p>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* MSc Data Science Programme */}
                    <div 
                        className="rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                            style={{ backgroundColor: '#4a90e2' }}
                        >
                            <Laptop className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: '#4a90e2' }}>
                            About MSc Data Science Programme of 2024-26
                        </h2>
                        <div className="space-y-4" style={{ color: '#666' }}>
                            <p className="leading-relaxed">
                                The Master of Data Science (MDS) is a postgraduate program that combines computer science and statistics to foster proficiency in data-driven decision-making. It is a two-year course comprising six trimesters.
                            </p>
                            <p className="leading-relaxed">
                                This programme aims to provide opportunity to all candidates to master the skill sets specific to data science with research bent. The curriculum supports the students to obtain adequate knowledge in theory of data science with hands-on experience in relevant domains and tools. Candidates gain exposure to research models and industry standard applications in data science through guest lectures, seminars, projects, internships, etc.
                            </p>
                        </div>
                    </div>

                    {/* Industry Connect Slider */}
                    <div 
                        className="rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                            style={{ backgroundColor: '#4a90e2' }}
                        >
                            <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: '#4a90e2' }}>
                            Industry Connect
                        </h2>
                        
                        <div className="relative">
                            {/* Slider Container */}
                            <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: '#f0f0f0' }}>
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className="transition-opacity duration-500"
                                        style={{
                                            display: index === currentSlide ? 'block' : 'none',
                                            opacity: index === currentSlide ? 1 : 0
                                        }}
                                    >
                                        <div className="relative h-64 sm:h-80">
                                            <img
                                                src={slide.src}
                                                alt={slide.alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div 
                                                className="absolute inset-0"
                                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
                                            ></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                                            <p className="text-sm opacity-90">{slide.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => changeSlide(-1)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'}
                            >
                                <ChevronLeft className="w-6 h-6" style={{ color: '#333' }} />
                            </button>
                            <button
                                onClick={() => changeSlide(1)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'}
                            >
                                <ChevronRight className="w-6 h-6" style={{ color: '#333' }} />
                            </button>

                            {/* Slide Indicators */}
                            <div className="flex justify-center gap-2 mt-4">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className="w-2 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            backgroundColor: index === currentSlide ? '#4a90e2' : '#d0d0d0',
                                            width: index === currentSlide ? '24px' : '8px'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default AboutSection;