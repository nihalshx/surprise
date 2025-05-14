import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Heart, Mail } from 'lucide-react';

const LoveLetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="love-letter" className="bg-gradient-to-b from-midnight-500 to-midnight-400 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A Letter From My Heart
        </motion.h2>

        <motion.div
          ref={ref}
          className="relative mx-auto perspective-1000"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className={`bg-white rounded-2xl shadow-2xl shadow-accent-500/20 mx-auto max-w-2xl overflow-hidden transform-gpu ${
              isOpen ? 'scale-100' : 'scale-95'
            } transition-transform duration-500`}
            initial={false}
            animate={{ rotateY: isOpen ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Envelope Front */}
            <motion.div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 bg-gradient-to-br from-white via-sakura-100 to-sakura-200 p-8 backface-hidden`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail size={180} className="text-sakura-300" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center py-12">
                <Heart size={40} className="text-accent-500 mb-4" />
                <h3 className="font-handwriting text-4xl md:text-5xl text-midnight-900 mb-4">My Dearest Hanna</h3>
                <p className="text-center text-xl text-midnight-800 font-medium mb-8 max-w-md">
                  There are words in my heart that I want to share with you. Click to open this letter.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-sakura-500 to-accent-500 text-white text-lg font-medium py-4 px-8 rounded-full 
                            shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1 transition-all"
                  onClick={() => setIsOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Letter
                </motion.button>
              </div>
            </motion.div>

            {/* Letter Content */}
            <motion.div
              className="absolute inset-0 w-full h-full bg-white p-12 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="max-w-none space-y-8">
                <p className="font-handwriting text-5xl text-accent-600 mb-12">My Dearest Hanna,</p>
                
                <p className="text-xl text-midnight-900 leading-relaxed font-medium">
                  From the moment you entered my life, you've filled it with a light I never knew existed. 
                  Your smile brightens my darkest days, and your laugh is the soundtrack to my happiest moments.
                </p>
                
                <p className="text-xl text-midnight-900 leading-relaxed font-medium">
                  I cherish every moment we spend together, from the grand adventures to the quiet evenings. 
                  You've shown me what it means to truly love and be loved in return.
                </p>
                
                <p className="text-xl text-midnight-900 leading-relaxed font-medium">
                  When I look into your eyes, I see not only the present but our future unfolding before us. 
                  A future filled with laughter, growth, and endless love.
                </p>
                
                <p className="text-xl text-midnight-900 leading-relaxed font-medium">
                  Thank you for being you. Thank you for choosing me. Thank you for walking this journey together.
                </p>
                
                <div className="mt-16 text-right space-y-2">
                  <p className="font-handwriting text-4xl text-accent-600">
                    Forever yours,
                  </p>
                  <p className="font-handwriting text-4xl text-accent-600">
                    Me
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-16">
                <motion.button
                  className="bg-gradient-to-r from-sakura-500 to-accent-500 text-white text-lg font-medium py-4 px-8 rounded-full 
                            shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-1 transition-all"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Letter
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetterSection;