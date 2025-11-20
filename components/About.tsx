import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-2xl text-center space-y-8">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-8 border border-zinc-800 shadow-xl shadow-zinc-900/50">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Photographer" className="w-full h-full object-cover" />
        </div>
        
        <h2 className="font-display text-5xl text-white">The Vision</h2>
        
        <p className="text-zinc-400 font-light leading-loose text-lg font-serif">
          Photography is not just about capturing light; it is about capturing the silence between the chaos. 
          LUMINA is a digital exhibition space designed to elevate visual storytelling through minimalism and artificial intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-zinc-800 mt-12">
          <div>
            <h3 className="text-white font-display text-xl mb-2">Equipment</h3>
            <p className="text-zinc-500 text-sm font-light">Leica M11 Monochrom<br/>Sony A7RV<br/>Fujifilm GFX 100S</p>
          </div>
          <div>
            <h3 className="text-white font-display text-xl mb-2">Focus</h3>
            <p className="text-zinc-500 text-sm font-light">Fine Art Architecture<br/>Emotive Portraiture<br/>Abstract Landscapes</p>
          </div>
          <div>
             <h3 className="text-white font-display text-xl mb-2">Contact</h3>
             <p className="text-zinc-500 text-sm font-light">hello@lumina.art<br/>Based in Tokyo, Japan</p>
          </div>
        </div>
      </div>
    </section>
  );
};