import React, { useState, useEffect } from 'react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop", // Tokyo night/moody
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop", // Foggy nature
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop", // Landscape
  "https://images.unsplash.com/photo-1501876725168-005dd45c63ee?q=80&w=2000&auto=format&fit=crop"  // Abstract architecture
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Hero slide ${index + 1}`}
              className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
             {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/20 to-zinc-950" />
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center space-y-8 px-4 mt-10">
        <h1 className="font-display text-6xl md:text-9xl text-white tracking-tighter drop-shadow-2xl animate-[fadeIn_1.5s_ease-out]">
          LUMINA
        </h1>
        
        <div className="overflow-hidden">
          <p className="max-w-xl mx-auto text-zinc-200 font-light text-sm md:text-base tracking-[0.3em] uppercase leading-loose animate-[slideUp_1.2s_ease-out_0.5s_both]">
            Visual Narratives &amp; Silent Spaces
          </p>
        </div>

        <div className="animate-[fadeIn_2s_ease-out_1s_both]">
           <div className="h-12 w-[1px] bg-white/50 mx-auto mt-12"></div>
        </div>
      </div>
    </section>
  );
};