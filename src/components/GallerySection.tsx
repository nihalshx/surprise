import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { galleryImages } from '../data/galleryData';
import { X } from 'lucide-react';

const GallerySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-gradient-to-b from-midnight-600 to-midnight-500 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Moments Captured
        </motion.h2>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="cursor-pointer relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image.id)}
              whileHover={{ y: -5 }}
            >
              <div className="overflow-hidden rounded-lg bg-white p-3 shadow-lg transform rotate-0 group-hover:rotate-1 transition-transform">
                <div className="relative overflow-hidden rounded">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-64 object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <p className="mt-3 font-handwriting text-midnight-900 text-center text-lg">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-900/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                
                {galleryImages.find(img => img.id === selectedImage) && (
                  <>
                    <img 
                      src={galleryImages.find(img => img.id === selectedImage)?.src} 
                      alt={galleryImages.find(img => img.id === selectedImage)?.caption}
                      className="w-full object-contain max-h-[80vh]" 
                    />
                    <div className="bg-white p-4 text-center">
                      <p className="font-handwriting text-2xl text-midnight-900">
                        {galleryImages.find(img => img.id === selectedImage)?.caption}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;