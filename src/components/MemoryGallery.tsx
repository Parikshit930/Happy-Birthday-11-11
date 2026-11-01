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

  const validMemories = config.memories.filter(m => Boolean(m.src));
  // If 'all', show all; otherwise filter, but default to 'all'
  const filtered = activeCategory === 'all'
    ? validMemories
    : validMemories.filter(m => m.category === activeCategory);

  const currentMemory = selectedMemory !== null ? validMemories.find(m => m.id === selectedMemory) : null;

  const navigate = (dir: number) => {
    if (selectedMemory === null) return;
    const currentIndex = filtered.findIndex(m => m.id === selectedMemory);
    const newIndex = (currentIndex + dir + filtered.length) % filtered.length;
    setSelectedMemory(filtered[newIndex].id);
    setShowWhySpecial(false);
  };

  return (
    <section className="relative py-24 md:py-36 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full min-w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Our Memories</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            A Thousand Little Moments,
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            A Million Little Feelings.
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-burgundy text-white shadow-lg scale-105'
                  : 'bg-white/80 text-dusty-pink hover:bg-blush/40 border border-blush/30'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && ` (${validMemories.length})`}
            </button>
          ))}
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs text-burgundy underline hover:text-dusty-pink ml-2 cursor-pointer"
            >
              Show all ({validMemories.length})
            </button>
          )}
        </div>

        {/* Centered Gallery Cards — Always fully visible */}
        <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8 max-w-6xl mx-auto w-full">
          {filtered.map((memory) => (
            <motion.div
              key={memory.id}
              className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm mx-auto cursor-pointer group flex flex-col bg-white/80 rounded-3xl p-3.5 shadow-md hover:shadow-xl transition-all border border-blush/30"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => { setSelectedMemory(memory.id); setShowWhySpecial(false); }}
            >
              {/* Photo */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm w-full bg-cream"
              >
                <img
                  src={memory.src}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                {/* Heart badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                  <Heart size={16} className="text-pink-200" fill="currentColor" />
                </div>
                {/* Category tag */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-burgundy/80 backdrop-blur-xs text-[11px] text-white tracking-wide uppercase font-medium">
                  {memory.date}
                </div>
              </div>

              {/* Visible Caption & Story Preview */}
              <div className="p-3 text-left flex flex-col flex-grow justify-between">
                <h4 className="text-burgundy font-serif font-bold text-base md:text-lg mb-1 leading-snug line-clamp-1">
                  {memory.caption}
                </h4>
                <p className="text-xs text-dusty-pink italic line-clamp-2 leading-relaxed">
                  {memory.whySpecial}
                </p>
                <span className="text-[11px] text-rose-gold mt-2 font-medium flex items-center gap-1 group-hover:text-burgundy transition-colors">
                  Tap to view full story & photo ♡
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMemory !== null && currentMemory && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
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
              <div className="p-6 sm:p-8 md:p-10">
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
