import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeartCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; scale: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Occasionally create a floating heart
      if (Math.random() < 0.1) {
        const newHeart = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          scale: 0.5 + Math.random() * 0.5,
        };
        
        setHearts((prevHearts) => [...prevHearts, newHeart]);
        
        // Remove heart after animation
        setTimeout(() => {
          setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-accent-500"
          initial={{ x: heart.x, y: heart.y, scale: heart.scale, opacity: 0.8 }}
          animate={{
            y: heart.y - 100 - Math.random() * 100,
            opacity: 0,
            scale: heart.scale * 1.5,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{ x: heart.x, originX: 0.5, originY: 0.5 }}
        >
          ❤️
        </motion.div>
      ))}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-accent-500/20 backdrop-blur-sm pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
      >
        <div className="text-accent-500 text-xl">❤️</div>
      </motion.div>
    </>
  );
};

export default HeartCursor;