import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomeAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-midnight-900 to-midnight-950"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: animate ? 0 : 1,
        pointerEvents: animate ? 'none' : 'auto'
      }}
      transition={{ duration: 2, delay: 4 }}
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="font-handwriting text-5xl md:text-7xl text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Hi Hanna,
        </motion.div>
        
        <motion.div
          className="font-serif text-2xl md:text-3xl text-white/80 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          I made this for you...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeAnimation;