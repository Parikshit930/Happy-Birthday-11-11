import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useHooks';

export default function RoseGarden() {
  const [bloomedCount, setBloomedCount] = useState(0);
  const [roses, setRoses] = useState(Array(12).fill(false));
  const [showMessage, setShowMessage] = useState(false);
  const [ref, isInView] = useInView(0.1);

  const handleRoseClick = (index: number) => {
    if (roses[index]) return;
    const newRoses = [...roses];
    newRoses[index] = true;
    setRoses(newRoses);
    const newCount = bloomedCount + 1;
    setBloomedCount(newCount);
    if (newCount >= 8) {
      setShowMessage(true);
    }
  };

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Dreamy background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #FFF8F5 0%, #F8C8DC 30%, #F4A7C1 60%, #FFF8F5 100%)',
        }}
      />

      {/* Floating butterflies */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${15 + i * 25}%`, top: `${20 + (i % 2) * 30}%` }}
          animate={{
            y: [0, -30, -10, -35, 0],
            x: [0, 20, -10, 15, 0],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🦋
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">A Garden For You</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-4">
            The Virtual Rose Garden
          </h2>
          <p className="text-romantic text-lg text-dusty-pink italic max-w-xl mx-auto leading-relaxed">
            "If I could give you every flower in the world, I'd still want to give you something more beautiful — a reminder of how special you are."
          </p>
        </motion.div>

        {/* Rose garden grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-lg mx-auto mb-10">
          {roses.map((bloomed, i) => (
            <motion.button
              key={i}
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: bloomed
                  ? 'radial-gradient(circle, rgba(244, 167, 193, 0.4), transparent)'
                  : 'radial-gradient(circle, rgba(248, 200, 220, 0.2), transparent)',
              }}
              onClick={() => handleRoseClick(i)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.span
                className="text-3xl md:text-4xl"
                animate={bloomed ? { scale: [0, 1.3, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                {bloomed ? '🌹' : '🌱'}
              </motion.span>

              {/* Glow effect when bloomed */}
              {bloomed && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(244, 167, 193, 0.3), transparent)',
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress */}
        <p className="text-sm text-rose-gold mb-4">
          {bloomedCount} of 12 roses bloomed
        </p>

        {/* Hidden message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm max-w-md mx-auto"
              style={{ boxShadow: '0 20px 60px rgba(244, 167, 193, 0.2)' }}
            >
              <p className="text-handwritten text-2xl text-burgundy">
                "Every flower here is beautiful, but none of them could ever compete with the person reading this."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
