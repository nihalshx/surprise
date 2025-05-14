import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart } from 'lucide-react';

const OutroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="outro" className="bg-gradient-to-b from-midnight-900 to-black py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Heart size={60} className="text-accent-500 fill-accent-500" />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ y: 40 }}
            animate={inView ? { y: 0 } : { y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-5xl md:text-6xl text-white font-handwriting">
              With All My Love
            </h2>
            
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-accent-300 to-transparent"></div>
            
            <p className="text-white/80 font-serif text-xl italic max-w-xl mx-auto">
              Thank you for being the star of my show, the protagonist of my story, and the love of my life.
            </p>
            
            <p className="font-handwriting text-2xl text-accent-400">
              Yours Forever,
            </p>
          </motion.div>

          {/* Credits animation */}
          <motion.div
            className="mt-20 opacity-60"
            initial={{ y: 100 }}
            animate={inView ? { y: 0 } : { y: 100 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-white/60 uppercase tracking-widest text-xs mb-2">
              Made with love
            </p>
            <p className="text-white/60 text-sm">
              © 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OutroSection;