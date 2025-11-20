
import React, { useEffect, useState } from 'react';
import { NavItem, View } from '../types';
import { Camera, Sparkles, User, Heart, BookOpen, Coffee } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const navItems: NavItem[] = [
  { id: 'wedding', label: 'WEDDING', labelZh: '婚礼拍摄' },
  { id: 'documentary', label: 'DOCUMENTARY', labelZh: '纪实叙事' },
  { id: 'daily', label: 'DAILY', labelZh: '日常拍摄' },
  { id: 'curator', label: 'AI CURATOR', labelZh: '智能策展' },
  { id: 'about', label: 'ABOUT', labelZh: '关于我' },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-white selection:text-black flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-zinc-800 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div
            className="text-2xl font-display tracking-widest font-semibold cursor-pointer text-white"
            onClick={() => setView('documentary')}
          >
            LUMINA
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 lg:space-x-14">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className="relative group h-10 overflow-hidden"
              >
                {/* Sliding Text Container */}
                <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2 h-[200%]">
                  {/* English Label (Default) */}
                  <span 
                    className={`flex items-center justify-center h-1/2 text-xs lg:text-sm tracking-[0.2em] uppercase whitespace-nowrap ${
                      currentView === item.id ? 'text-white font-medium' : 'text-zinc-500'
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Chinese Label (Hover) */}
                  <span 
                    className={`flex items-center justify-center h-1/2 text-xs lg:text-sm tracking-[0.1em] whitespace-nowrap ${
                      currentView === item.id ? 'text-white font-medium' : 'text-zinc-300'
                    }`}
                  >
                    {item.labelZh}
                  </span>
                </div>

                {/* Active/Hover Line */}
                <span 
                  className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ease-out ${
                    currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile Nav Icons */}
          <div className="flex md:hidden space-x-6 text-zinc-400">
             <button onClick={() => setView('wedding')} className={currentView === 'wedding' ? 'text-white' : ''}>
               <Heart size={20} />
             </button>
             <button onClick={() => setView('documentary')} className={currentView === 'documentary' ? 'text-white' : ''}>
               <BookOpen size={20} />
             </button>
             <button onClick={() => setView('daily')} className={currentView === 'daily' ? 'text-white' : ''}>
               <Coffee size={20} />
             </button>
             <button onClick={() => setView('curator')} className={currentView === 'curator' ? 'text-white' : ''}>
               <Sparkles size={20} />
             </button>
             <button onClick={() => setView('about')} className={currentView === 'about' ? 'text-white' : ''}>
               <User size={20} />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 mt-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="font-display text-zinc-600 text-sm tracking-[0.2em]">
            © {new Date().getFullYear()} LUMINA PHOTOGRAPHY
          </p>
          <p className="text-zinc-700 text-xs mt-4 font-light">
            婚礼拍摄 · 纪实叙事 · 日常拍摄
          </p>
        </div>
      </footer>
    </div>
  );
};
