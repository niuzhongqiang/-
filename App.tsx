import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Curator } from './components/Curator';
import { About } from './components/About';
import { View } from './types';

const App: React.FC = () => {
  // Default view set to 'documentary' as the main landing
  const [currentView, setCurrentView] = useState<View>('documentary');

  const isGalleryView = (view: View) => ['wedding', 'documentary', 'daily'].includes(view);

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {isGalleryView(currentView) && (
        <>
          {/* We keep the Hero on photography pages for the vibe, but could customize it per category if desired */}
          <Hero />
          <Gallery category={currentView as 'wedding' | 'documentary' | 'daily'} />
        </>
      )}
      {currentView === 'curator' && <Curator />}
      {currentView === 'about' && <About />}
    </Layout>
  );
};

export default App;