import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import sakuraAnimation from '../assets/animations/sakura-animation.json';

interface AnimatedSakuraPetalsProps {
  density?: number;
}

const AnimatedSakuraPetals: React.FC<AnimatedSakuraPetalsProps> = ({ density = 10 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Lottie 
          animationData={sakuraAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default AnimatedSakuraPetals;