import React, { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, Aperture, Palette } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

export const Curator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError("Image size too large. Please use an image under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImage(result);
      setAnalysis(null);
      setError(null);
      handleAnalyze(result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (base64Data: string, mimeType: string) => {
    setLoading(true);
    setError(null);
    try {
      // Extract strictly the base64 part for the API
      const base64Content = base64Data.split(',')[1];
      const result = await analyzeImage(base64Content, mimeType);
      setAnalysis(result);
    } catch (err) {
      setError("Unable to curate this image. Ensure your API Key is valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 min-h-[80vh] flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-display text-4xl md:text-5xl text-white">The AI Curator</h2>
        <p className="text-zinc-500 font-light max-w-md mx-auto">
          Upload a photograph. Let our intelligence analyze its composition, mood, and generate a professional portfolio entry.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Upload Area */}
        <div
          className={`relative aspect-[3/4] md:aspect-square border border-dashed rounded-sm flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${
             image ? 'border-zinc-800 bg-zinc-900/20' : 'border-zinc-700 hover:border-zinc-500 cursor-pointer bg-zinc-900/50 hover:bg-zinc-900'
          }`}
          onClick={() => !image && fileInputRef.current?.click()}
        >
          {image ? (
            <>
              <img src={image} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain p-4" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setAnalysis(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <Upload size={16} />
              </button>
            </>
          ) : (
            <div className="text-center p-6 space-y-4">
              <Upload className="mx-auto text-zinc-500" size={48} strokeWidth={1} />
              <p className="text-zinc-400 font-light tracking-wider text-sm uppercase">Click to Select Photograph</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Analysis Result Area */}
        <div className="flex flex-col justify-center h-full min-h-[400px]">
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-4 text-zinc-500 h-full">
              <Loader2 className="animate-spin" size={32} />
              <p className="font-serif italic text-sm">Analyzing light and composition...</p>
            </div>
          )}

          {error && (
            <div className="text-red-400 border border-red-900/30 bg-red-900/10 p-6 text-center text-sm font-light">
              {error}
            </div>
          )}

          {!loading && !analysis && !error && (
             <div className="flex flex-col items-center justify-center h-full text-zinc-700 space-y-4">
                <Aperture size={48} strokeWidth={0.5} />
                <p className="font-serif italic">Waiting for visual input...</p>
             </div>
          )}

          {analysis && !loading && (
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <div>
                <h3 className="font-display text-4xl text-white mb-2 leading-tight">{analysis.title}</h3>
                <div className="h-1 w-12 bg-white mb-6"></div>
                <p className="text-zinc-300 font-serif italic leading-relaxed text-lg">
                  "{analysis.moodDescription}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-zinc-800 pt-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Technical Specs</h4>
                  <ul className="space-y-1 text-sm font-light text-zinc-300">
                    <li><span className="text-zinc-500 w-16 inline-block">Camera</span> {analysis.estimatedExif.camera}</li>
                    <li><span className="text-zinc-500 w-16 inline-block">Lens</span> {analysis.estimatedExif.lens}</li>
                    <li><span className="text-zinc-500 w-16 inline-block">ISO</span> {analysis.estimatedExif.iso}</li>
                    <li><span className="text-zinc-500 w-16 inline-block">Aperture</span> {analysis.estimatedExif.aperture}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Palette</h4>
                  <div className="flex space-x-2">
                    {analysis.colorPalette.map((color, idx) => (
                      <div key={idx} className="group relative">
                        <div
                          className="w-8 h-8 rounded-full border border-white/10 shadow-lg"
                          style={{ backgroundColor: color }}
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};