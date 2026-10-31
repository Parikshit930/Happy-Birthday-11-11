import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../data/config';

export function SecretHeart() {
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5) {
      setShowMessage(true);
    }
  };

  return (
    <>
      <motion.button
        className="fixed top-6 left-6 z-[55] opacity-30 hover:opacity-60 transition-opacity"
        onClick={handleClick}
        whileTap={{ scale: 0.8 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        title=""
      >
        <Heart size={16} className="text-rose-soft" fill="currentColor" />
      </motion.button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md text-center"
              style={{ boxShadow: '0 30px 80px rgba(125, 41, 74, 0.2)' }}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💗
              </motion.div>
              <p className="text-romantic text-xl text-burgundy italic leading-relaxed">
                {config.secretHeartMessage}
              </p>
              <button
                onClick={() => setShowMessage(false)}
                className="mt-6 text-dusty-pink hover:text-burgundy text-sm transition-colors"
              >
                Close ♡
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── NAVIGATION ──
export function Navigation() {
  const sections = [
    { id: 'hero', label: '♡' },
    { id: 'story', label: 'Story' },
    { id: 'memories', label: 'Memories' },
    { id: 'letter', label: 'Letter' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'cake', label: 'Cake' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-1/2 -translate-y-1/2 right-4 z-[55] hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group relative flex items-center justify-end"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-burgundy bg-white/90 px-2 py-1 rounded-l-lg mr-2 whitespace-nowrap shadow-sm">
            {s.label}
          </span>
          <div className="w-2 h-2 rounded-full bg-rose-soft/50 group-hover:bg-burgundy group-hover:scale-150 transition-all duration-300" />
        </button>
      ))}
    </motion.nav>
  );
}
