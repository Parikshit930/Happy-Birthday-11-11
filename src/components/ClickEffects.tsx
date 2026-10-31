import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ArrowUp } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function ClickHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't trigger on buttons or interactive elements
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    const colors = ['#F8C8DC', '#F4A7C1', '#EFA3B8', '#D98CA8', '#7D294A'];
    const newHearts: FloatingHeart[] = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() - 0.5) * 30,
      y: e.clientY + (Math.random() - 0.5) * 20,
      size: Math.random() * 12 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setHearts(prev => [...prev, ...newHearts]);

    // Clean up after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[70]">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: heart.x, top: heart.y }}
            initial={{ opacity: 1, scale: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Heart
              size={heart.size}
              style={{ color: heart.color }}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-[55] w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(244, 167, 193, 0.8), rgba(217, 140, 168, 0.8))',
        backdropFilter: 'blur(10px)',
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp size={18} className="text-white" />
    </motion.button>
  );
}
