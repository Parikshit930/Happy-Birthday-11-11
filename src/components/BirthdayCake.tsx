import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Cake } from 'lucide-react';
import { useInView } from '../hooks/useHooks';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [stage, setStage] = useState(0); // 0: wish, 1: blowing, 2: blown, 3: cutting, 4: done
  const [ref, isInView] = useInView(0.1);

  const handleBlow = () => {
    setStage(2);
    // Fireworks
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#F8C8DC', '#F4A7C1', '#F7E7CE', '#7D294A'] });
    }, 300);
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#EFA3B8', '#D98CA8', '#F7E7CE'] });
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#EFA3B8', '#D98CA8', '#F7E7CE'] });
    }, 800);
    setTimeout(() => setStage(3), 3000);
  };

  const handleCut = () => {
    setStage(4);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 }, colors: ['#F8C8DC', '#F4A7C1', '#F7E7CE'] });
  };

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">A Special Moment</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Make a Wish, Birthday Girl
          </h2>
        </motion.div>

        {/* Cake */}
        <motion.div
          className="relative mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Cake SVG */}
          <div className="relative w-64 h-72 md:w-80 md:h-96 mx-auto">
            {/* Candles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-6 md:gap-8">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flame */}
                  <AnimatePresence>
                    {stage < 2 && (
                      <motion.div
                        className="w-3 h-5 md:w-4 md:h-6 rounded-full mb-1"
                        style={{
                          background: 'radial-gradient(ellipse, #FFD700, #FF8C00, #FF4500)',
                          boxShadow: '0 0 10px #FFD700, 0 0 20px rgba(255, 140, 0, 0.5)',
                        }}
                        animate={{
                          scaleY: [1, 1.1, 0.95, 1.05, 1],
                          scaleX: [1, 0.9, 1.05, 0.95, 1],
                        }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                      />
                    )}
                  </AnimatePresence>
                  {/* Candle stick */}
                  <div
                    className="w-2 h-12 md:w-3 md:h-16 rounded-full"
                    style={{
                      background: i === 1 ? 'linear-gradient(to bottom, #F4A7C1, #EFA3B8)' : 'linear-gradient(to bottom, #F8C8DC, #F4A7C1)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Top tier */}
            <div
              className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-32 md:w-40 h-16 md:h-20 rounded-t-3xl"
              style={{
                background: 'linear-gradient(to bottom, #F8C8DC, #F4A7C1)',
                boxShadow: '0 5px 15px rgba(244, 167, 193, 0.3)',
              }}
            >
              {/* Frosting drips */}
              <div className="absolute -bottom-2 left-4 w-3 h-4 rounded-full bg-white/60" />
              <div className="absolute -bottom-3 left-12 w-4 h-5 rounded-full bg-white/50" />
              <div className="absolute -bottom-2 right-6 w-3 h-4 rounded-full bg-white/60" />
              {/* Decorations */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
                <span className="text-xs">🌸</span>
                <span className="text-xs">🌸</span>
                <span className="text-xs">🌸</span>
              </div>
            </div>

            {/* Middle tier */}
            <div
              className="absolute top-28 md:top-36 left-1/2 -translate-x-1/2 w-44 md:w-56 h-16 md:h-20 rounded-lg"
              style={{
                background: 'linear-gradient(to bottom, #F4A7C1, #EFA3B8)',
                boxShadow: '0 5px 15px rgba(244, 167, 193, 0.3)',
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
                <span className="text-sm">🍓</span>
                <span className="text-sm">🍓</span>
                <span className="text-sm">🍓</span>
              </div>
            </div>

            {/* Bottom tier */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-72 h-20 md:h-24 rounded-b-3xl rounded-t-lg"
              style={{
                background: 'linear-gradient(to bottom, #EFA3B8, #D98CA8)',
                boxShadow: '0 10px 30px rgba(217, 140, 168, 0.3)',
              }}
            >
              {/* Gold trim */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                <span className="text-sm">✨</span>
                <span className="text-sm">🌹</span>
                <span className="text-sm">✨</span>
              </div>
            </div>

            {/* Cake plate */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 md:w-80 h-4 rounded-full bg-gradient-to-r from-gray-200 via-white to-gray-200 opacity-60" />
          </div>
        </motion.div>

        {/* Interaction area */}
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-romantic text-xl text-dusty-pink italic mb-6">
                Close your eyes and make a wish...
              </p>
              <button
                onClick={() => setStage(1)}
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F4A7C1, #D98CA8)',
                  boxShadow: '0 10px 30px rgba(244, 167, 193, 0.3)',
                }}
              >
                I've Made My Wish ✨
              </button>
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="blow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-romantic text-xl text-dusty-pink italic mb-6">
                Now blow out your candles...
              </p>
              <button
                onClick={handleBlow}
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105 animate-pulse-soft"
                style={{
                  background: 'linear-gradient(135deg, #D98CA8, #7D294A)',
                  boxShadow: '0 10px 30px rgba(125, 41, 74, 0.3)',
                }}
              >
                <span className="flex items-center gap-2">
                  <Wind size={20} />
                  Blow Out Your Candles
                </span>
              </button>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                className="text-handwritten text-3xl text-burgundy mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                May every little wish your heart makes find its way to you.
              </motion.p>
              <div className="flex items-center justify-center gap-2">
                {['🎉', '✨', '🌟', '💫', '🎊'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="cut"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-romantic text-xl text-dusty-pink italic mb-6">
                Ready to cut the cake?
              </p>
              <button
                onClick={handleCut}
                className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F4A7C1, #7D294A)',
                  boxShadow: '0 10px 30px rgba(125, 41, 74, 0.3)',
                }}
              >
                <span className="flex items-center gap-2">
                  <Cake size={20} />
                  Cut Our Cake ♡
                </span>
              </button>
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <motion.div
                className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm"
                style={{ boxShadow: '0 10px 40px rgba(244, 167, 193, 0.2)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-romantic text-xl text-burgundy italic">
                  "Here's to another year of beautiful moments, laughter, and everything wonderful."
                </p>
                <p className="text-handwritten text-2xl text-dusty-pink mt-3">
                  Happy Birthday ♡
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
