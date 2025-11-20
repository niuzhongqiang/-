import React, { useState } from 'react';
import { Photo, Category } from '../types';
import { X } from 'lucide-react';

// Expanded Mock Data with Categories
const PHOTOS: Photo[] = [
  // Wedding
  { id: 'w1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600', aspectRatio: 'landscape', title: 'The Vow', category: 'wedding' },
  { id: 'w2', url: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=600', aspectRatio: 'portrait', title: 'First Dance', category: 'wedding' },
  { id: 'w3', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600', aspectRatio: 'portrait', title: 'Veil & Light', category: 'wedding' },
  { id: 'w4', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600', aspectRatio: 'landscape', title: 'Intimacy', category: 'wedding' },
  
  // Documentary (Narrative)
  { id: 'd1', url: 'https://images.unsplash.com/photo-1501876725168-005dd45c63ee?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1501876725168-005dd45c63ee?q=80&w=600', aspectRatio: 'portrait', title: 'Concrete Dreams', category: 'documentary' },
  { id: 'd2', url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=600', aspectRatio: 'portrait', title: 'Urban Solitude', category: 'documentary' },
  { id: 'd3', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600', aspectRatio: 'square', title: 'The Observer', category: 'documentary' },
  { id: 'd4', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600', aspectRatio: 'square', title: 'Intersection', category: 'documentary' },
  { id: 'd5', url: 'https://images.unsplash.com/photo-1555685812-4b943f3e99a9?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1555685812-4b943f3e99a9?q=80&w=600', aspectRatio: 'portrait', title: 'Night City', category: 'documentary' },
  
  // Daily
  { id: 'l1', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600', aspectRatio: 'landscape', title: 'Morning Coffee', category: 'daily' },
  { id: 'l2', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600', aspectRatio: 'landscape', title: 'Silence', category: 'daily' },
  { id: 'l3', url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600', aspectRatio: 'landscape', title: 'Raindrops', category: 'daily' },
  { id: 'l4', url: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1200', thumbnail: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=600', aspectRatio: 'landscape', title: 'Deep Blue', category: 'daily' },
];

interface GalleryProps {
  category: Category;
}

export const Gallery: React.FC<GalleryProps> = ({ category }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = PHOTOS.filter(p => p.category === category);

  const getCategoryTitle = () => {
    switch(category) {
      case 'wedding': return 'Love & Union';
      case 'documentary': return 'Street Narratives';
      case 'daily': return 'Fragments of Time';
      default: return 'Gallery';
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-12 py-20 min-h-screen">
      
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-widest animate-[fadeIn_0.5s_ease-out]">
          {getCategoryTitle()}
        </h2>
        <div className="h-[1px] w-12 bg-zinc-800 mx-auto mt-6"></div>
      </div>

      {filteredPhotos.length === 0 ? (
         <div className="text-center text-zinc-600 font-serif italic py-20">
           No images in this collection yet.
         </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Image Container with Overlay */}
              <div className="relative overflow-hidden w-full">
                <img
                  src={photo.thumbnail}
                  alt={photo.title}
                  className="w-full h-auto object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Text Reveal */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <p className="font-serif italic text-white text-xl tracking-wide">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-4 md:p-10 animate-[fadeIn_0.3s_ease-out]">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-50"
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div className="max-w-7xl w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
               <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl shadow-black"
              />
            </div>
            
            <div className="w-full md:w-80 shrink-0 text-left md:border-l border-zinc-800/50 md:pl-8 py-4 animate-[slideLeft_0.5s_ease-out]">
              <h3 className="font-display text-4xl text-white mb-2">{selectedPhoto.title}</h3>
              <p className="text-zinc-500 font-serif italic text-sm mb-8 capitalize">{selectedPhoto.category} Collection</p>

              <div className="space-y-6 text-xs text-zinc-400 font-mono tracking-widest uppercase">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span>Dimensions</span>
                  <span>{selectedPhoto.aspectRatio}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                   <span>Year</span>
                   <span>2024</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                   <span>Format</span>
                   <span>Digital</span>
                </div>
                
                <div className="pt-6 text-zinc-500 leading-relaxed normal-case tracking-normal font-sans text-sm">
                  A curated moment from the {selectedPhoto.category} series. Capturing the essence of time and emotion through careful composition.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};