import React, { useEffect, useRef } from 'react';

const RecruitersSection = () => {
    const scrollRef = useRef(null);

    const companyLogos = [
        'Citi.svg.png',
        'consilio-vector-logo-removebg-preview.png',
        'MiQ_Logo-removebg-preview.png',
        'Syscloud_logo@2x.3ca6252c8cc99a8ffc85e4e2c6e6c1da225a3c48.png',
        'TOSHIBA_Logo.png',
        'Whatfix_Logo_RGB_Color.png',
    ];

    // Duplicate logos for seamless loop
    const duplicatedLogos = [...companyLogos, ...companyLogos];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.1; // Much slower scrolling
        let animationId;

        const scroll = () => {
            scrollPosition += scrollSpeed;
            
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }
            
            scrollContainer.scrollLeft = scrollPosition;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        const handleMouseEnter = () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
        
        const handleMouseLeave = () => {
            animationId = requestAnimationFrame(scroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section 
            id="recruiters" 
            className="py-8 px-4"
            style={{ backgroundColor: 'white', borderTop: '1px solid #e0e0e0' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Simple Header */}
                <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ color: '#333' }}
                >
                    Our Persistent Recruiters
                </h2>

                {/* Logo Carousel */}
                <div className="relative overflow-hidden">
                    {/* Gradient Overlays */}
                    <div 
                        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, white, transparent)' }}
                    ></div>
                    <div 
                        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, white, transparent)' }}
                    ></div>

                    {/* Scrolling Container */}
                    <div 
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-hidden py-4"
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 flex items-center justify-center transition-all duration-300"
                                style={{ 
                                    width: '150px',
                                    height: '60px'
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/company_logos/${logo}`}
                                    alt={`Company ${index + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    style={{ 
                                        filter: 'grayscale(100%)',
                                        opacity: 0.6,
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.filter = 'grayscale(0%)';
                                        e.target.style.opacity = '1';
                                        e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.filter = 'grayscale(100%)';
                                        e.target.style.opacity = '0.6';
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecruitersSection;