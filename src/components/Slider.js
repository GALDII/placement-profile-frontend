import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      src: process.env.PUBLIC_URL + '/assets/cup.jpg',
      alt: 'Slide 1',
      text: 'Class of M.Sc. (Data Science) 2024-26',
      subtext: 'Empowering the next generation of data scientists'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/Campus_Main_Entrance.jpg',
      alt: 'Slide 2',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/sports.jpg',
      alt: 'Slide 3',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/international.JPG',
      alt: 'Slide 4',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/sdg.jpg',
      alt: 'Slide 5',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/science_day.jpg',
      alt: 'Slide 5',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
    {
      src: process.env.PUBLIC_URL + '/assets/jeni.jpg',
      alt: 'Slide 5',
      text: 'CHRIST (Deemed to be University)',
      subtext: 'Bangalore Yeshwanthpur Campus'
    },
  ];

  const changeSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        changeSlide(1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isHovered]);

  return (
    <section 
      id="home" 
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Image with overlay gradient */}
          <div className="relative w-full h-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32">
            <div 
              className={`text-center px-6 transition-all duration-700 delay-300 ${
                index === currentSlide
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl">
                {slide.text}
              </h2>
              {slide.subtext && (
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 drop-shadow-lg">
                  {slide.subtext}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={() => changeSlide(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={() => changeSlide(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div
          className={`h-full bg-white transition-all ${
            isHovered ? 'w-0' : 'w-full'
          }`}
          style={{
            animation: isHovered ? 'none' : 'progress 3s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Slider;