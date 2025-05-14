import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gift, X } from 'lucide-react';

const GiftBoxSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="gift" className="bg-gradient-to-b from-midnight-400 to-midnight-300 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A Special Gift For You
        </motion.h2>

        <motion.div
          ref={ref}
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-br from-accent-300 to-accent-500 p-1 rounded-xl shadow-xl w-64 h-64 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            <div className="bg-white p-6 rounded-lg w-full h-full flex flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Gift size={80} className="text-accent-500 mb-4" />
              </motion.div>
              <p className="text-midnight-800 font-handwriting text-xl text-center">
                Click to open your gift
              </p>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-900/80 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="relative bg-white rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-midnight-800 hover:bg-white/30 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>

                <div className="p-8">
                  <h3 className="font-handwriting text-3xl text-accent-600 mb-4 text-center">
                    For My Beloved Hanna
                  </h3>
                  
                  <div className="prose prose-pink mx-auto">
                    <p className="font-serif text-midnight-800 text-center italic mb-6">
                      "Love is not about how many days, months, or years you have been together. 
                      Love is about how much you love each other every single day."
                    </p>
                    
                    <p className="text-midnight-800 mb-4">
                      Dearest Hanna,
                    </p>
                    
                    <p className="text-midnight-800 mb-4">
                      This digital gift is just a small token of my affection. The real gift is the promise of many more 
                      adventures together, more laughter, more growth, and a lifetime of love.
                    </p>
                    
                    <p className="text-midnight-800 mb-4">
                      Please check your phone for a special message. I've arranged something special for us, 
                      and this digital surprise is just the beginning.
                    </p>
                    
                    <p className="text-midnight-800 font-serif italic text-center my-8">
                      Our story is just beginning...
                    </p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <motion.div
                      className="bg-accent-100 p-4 rounded-full"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="w-16 h-16 flex items-center justify-center text-4xl">
                        ❤️
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GiftBoxSection;