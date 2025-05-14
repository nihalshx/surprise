import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { loveNotes } from '../data/loveNotesData';

const LoveNotesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  return (
    <section id="love-notes" className="bg-gradient-to-b from-midnight-400 to-midnight-300 py-20 px-4 md:px-8 relative overflow-hidden min-h-[70vh]">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why I Love You
        </motion.h2>

        <motion.div
          ref={ref}
          className="relative h-[50vh]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {loveNotes.map((note) => (
            <motion.div
              key={note.id}
              className="absolute"
              style={{
                top: note.position.top,
                left: note.position.left,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: note.delay }}
            >
              <motion.div
                className={`bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform ${
                  expandedNote === note.id ? 'scale-110' : 'scale-100'
                }`}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                style={{
                  maxWidth: expandedNote === note.id ? '280px' : '180px',
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                }}
              >
                <p className="font-handwriting text-midnight-900 text-lg md:text-xl">
                  {note.content}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent-300 text-2xl md:text-3xl lg:text-4xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveNotesSection;