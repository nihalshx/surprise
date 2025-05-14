import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { starMessages } from '../data/starMapData';

const StarMapSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // Create star dots
  const starDots = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }));

  // Create constellations (random connections between stars)
  const constellationLines = Array.from({ length: 15 }).map((_, i) => {
    const start = starDots[Math.floor(Math.random() * starDots.length)];
    const end = starDots[Math.floor(Math.random() * starDots.length)];
    return {
      id: i,
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    };
  });

  return (
    <section id="star-map" className="bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Constellation
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative aspect-[16/9] bg-gradient-radial from-midnight-900/40 to-midnight-950 rounded-xl overflow-hidden border border-white/10 shadow-inner"
        >
          {/* Background stars */}
          <div className="absolute inset-0">
            {starDots.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [0.4, 1, 0.4],
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

          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {constellationLines.map((line) => (
              <motion.line
                key={line.id}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: line.id * 0.1 }}
              />
            ))}
          </svg>

          {/* Interactive stars with messages */}
          {starMessages.map((star) => (
            <div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
            >
              <motion.div
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredStar(star.id)}
                onMouseLeave={() => setHoveredStar(null)}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: star.id * 0.2 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-sakura-400 blur-[1px]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute -inset-1 w-6 h-6 rounded-full border-2 border-accent-400/40"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <AnimatedStarMessage
                  message={star.message}
                  isVisible={hoveredStar === star.id}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center text-white/70">
          <p>Hover over the bright stars to reveal messages</p>
        </div>
      </div>
    </section>
  );
};

const AnimatedStarMessage = ({ message, isVisible }) => {
  return (
    <motion.div
      className="absolute w-48 top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-xl z-10"
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-3 h-3 bg-white/90 rotate-45" />
      </div>
      <p className="text-midnight-900 font-handwriting text-center text-lg">{message}</p>
    </motion.div>
  );
};

export default StarMapSection;