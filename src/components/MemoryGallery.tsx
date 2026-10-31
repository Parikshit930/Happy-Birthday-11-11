import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';

const categories = [
  { id: 'all', label: 'All Memories' },
  { id: 'favourites', label: 'Favourites' },
  { id: 'together', label: 'Us Together' },
  { id: 'random', label: 'Random Moments' },
  { id: 'smile', label: 'Makes Me Smile' },
  { id: 'unforgettable', label: 'Unforgettable' },
];

export default function MemoryGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [showWhySpecial, setShowWhySpecial] = useState(false);
  const [headerRef, headerInView] = useInView(0.1);

  const filtered = activeCategory === 'all'
    ? config.memories
    : config.memories.filter(m => m.category === activeCategory);

  const currentMemory = selectedMemory !== null ? config.memories.find(m => m.id === selectedMemory) : null;

  const navigate = (dir: number) => {
    if (selectedMemory === null) return;
    const currentIndex = filtered.findIndex(m => m.id === selectedMemory);
    const newIndex = (currentIndex + dir + filtered.length) % filtered.length;
    setSelectedMemory(filtered[newIndex].id);
    setShowWhySpecial(false);
  };

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Memories</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            A Thousand Little Moments,
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            A Million Little Feelings.
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-burgundy text-white shadow-lg'
                  : 'bg-white/70 text-dusty-pink hover:bg-blush/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((memory, i) => (
            <motion.div
              key={memory.id}
              className="break-inside-avoid cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => { setSelectedMemory(memory.id); setShowWhySpecial(false); }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px rgba(125, 41, 74, 0.1)',
                  border: '2px solid rgba(244, 167, 193, 0.2)',
                }}
              >
                {memory.src ? (
                  <img
                    src={memory.src}
                    alt={memory.caption}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                  />
                ) : (
                  <div
                    className="w-full bg-gradient-to-br from-blush/40 to-champagne/40 flex items-center justify-center"
                    style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1', minHeight: '180px' }}
                  >
                    <span className="text-4xl opacity-40">📷</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{memory.caption}</p>
                </div>
                {/* Heart icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart size={16} className="text-white" fill="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMemory !== null && currentMemory && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-blush transition-colors"
              >
                <X size={20} className="text-burgundy" />
              </button>

              {/* Image */}
              <div className="relative">
                {currentMemory.src ? (
                  <img src={currentMemory.src} alt={currentMemory.caption} className="w-full max-h-[50vh] object-contain bg-cream" />
                ) : (
                  <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blush/30 to-champagne/30 flex items-center justify-center">
                    <span className="text-6xl opacity-40">📷</span>
                  </div>
                )}
              </div>

              {/* Caption area */}
              <div className="p-6 md:p-8">
                <p className="text-romantic text-xl text-burgundy mb-2">{currentMemory.caption}</p>
                {currentMemory.date && (
                  <p className="text-sm text-rose-gold mb-4">{currentMemory.date}</p>
                )}

                <button
                  onClick={() => setShowWhySpecial(!showWhySpecial)}
                  className="text-dusty-pink hover:text-burgundy text-sm flex items-center gap-2 transition-colors"
                >
                  <Heart size={14} fill="currentColor" />
                  Why This Picture Is Special ♡
                </button>

                <AnimatePresence>
                  {showWhySpecial && (
                    <motion.p
                      className="mt-3 text-romantic text-dusty-pink italic leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {currentMemory.whySpecial}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <button
                onClick={() => navigate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-blush transition-colors"
              >
                <ChevronLeft size={20} className="text-burgundy" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-blush transition-colors"
              >
                <ChevronRight size={20} className="text-burgundy" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
