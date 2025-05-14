import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LoveStreakCounter from './LoveStreakCounter';

const HeroSection = () => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-gradient-to-b from-midnight-900 via-midnight-800 to-midnight-700 flex items-center justify-center">
      {/* Stars background */}
      <div className="absolute inset-0 opacity-80">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 text-center px-4">
        <motion.h1 
          className="font-handwriting text-5xl md:text-7xl lg:text-8xl text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          To Hanna, the love of my life
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-12"
        >
          <p className="font-serif text-xl md:text-2xl text-white/80 italic max-w-2xl mx-auto">
            A journey through our memories, dreams, and the love we share.
          </p>
        </motion.div>

        <div className="mb-8">
          <LoveStreakCounter />
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-sakura-500 to-accent-500 text-white font-medium py-3 px-6 rounded-full 
                     shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Begin Our Journey
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;