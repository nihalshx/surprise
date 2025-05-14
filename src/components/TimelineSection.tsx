import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { timelineData } from '../data/timelineData';
import { Clock, Heart } from 'lucide-react';

const TimelineSection = () => {
  return (
    <section id="timeline" className="bg-gradient-to-b from-midnight-700 to-midnight-600 py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Love Story
        </motion.h2>
        
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent-300 to-sakura-500 rounded-full" />
          
          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      className={`flex items-center mb-20 ${isEven ? 'flex-row' : 'flex-row-reverse'} md:flex-row-reverse md:even:flex-row`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 p-6 ${isEven ? 'text-right' : 'text-left'} md:text-left md:even:text-right`}>
        <h3 className="text-sakura-400 font-handwriting text-2xl md:text-3xl mb-2">{item.title}</h3>
        <div className="flex items-center mb-3 gap-2 text-white/70 text-sm font-medium 
                      justify-start md:justify-start md:even:justify-end">
          <Clock size={16} />
          <span>{item.date}</span>
        </div>
        <p className="text-white/80">{item.description}</p>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center justify-center w-2/12">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-br from-accent-500 to-sakura-500 rounded-full flex items-center justify-center shadow-lg shadow-accent-500/30 z-10"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Heart size={20} className="text-white" />
        </motion.div>
      </div>

      {/* Image */}
      <div className="hidden md:block w-5/12 overflow-hidden rounded-lg">
        {item.imageSrc && (
          <motion.img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-60 object-cover"
            initial={{ scale: 1.2, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TimelineSection;