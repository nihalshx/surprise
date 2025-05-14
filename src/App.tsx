import React, { useState } from 'react';
import WelcomeAnimation from './components/WelcomeAnimation';
import HeartCursor from './components/HeartCursor';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import LoveLetterSection from './components/LoveLetterSection';
import LoveNotesSection from './components/LoveNotesSection';
import StarMapSection from './components/StarMapSection';
import GiftBoxSection from './components/GiftBoxSection';
import OutroSection from './components/OutroSection';
import AnimatedSakuraPetals from './components/AnimatedSakuraPetals';
import PasswordEntry from './components/PasswordEntry';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowWelcome(true);
  };

  if (!isUnlocked) {
    return <PasswordEntry onUnlock={handleUnlock} correctPassword="hanna" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Custom cursor */}
      <HeartCursor />
      
      {/* Initial welcome animation */}
      {showWelcome && <WelcomeAnimation />}
      
      {/* Floating sakura petals that appear throughout the site */}
      <AnimatedSakuraPetals />
      
      {/* Main content sections */}
      <main>
        <HeroSection />
        <TimelineSection />
        <GallerySection />
        <LoveLetterSection />
        <LoveNotesSection />
        <StarMapSection />
        <GiftBoxSection />
        <OutroSection />
      </main>
    </div>
  );
}

export default App;