import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveStreakCounter = () => {
  const [days, setDays] = useState(0);
  
  useEffect(() => {
    const startDate = new Date('2024-10-25');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="text-accent-500" fill="currentColor" />
      </motion.div>
      <div className="text-white">
        <div className="text-3xl font-bold font-handwriting">{days}</div>
        <div className="text-sm opacity-80">Days of Love</div>
      </div>
    </motion.div>
  );
};

export default LoveStreakCounter;