import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Cake, Sparkles, Heart } from 'lucide-react';
import { useInView } from '../hooks/useHooks';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [stage, setStage] = useState(0); // 0: wish, 1: blow, 2: blown/celebrate, 3: cut, 4: done
  const [ref, isInView] = useInView(0.1);

  const handleBlow = () => {
    setStage(2);
    // Multi-stage confetti celebration
    setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F8C8DC', '#F4A7C1', '#F7E7CE', '#7D294A', '#EFA3B8'],
      });
    }, 250);
    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#EFA3B8', '#D98CA8', '#F7E7CE'],
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#EFA3B8', '#D98CA8', '#F7E7CE'],
      });
    }, 700);
    setTimeout(() => setStage(3), 3200);
  };

  const handleCut = () => {
    setStage(4);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#F8C8DC', '#F4A7C1', '#F7E7CE', '#7D294A'],
    });
  };

  return (
    <section className="relative py-28 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full min-w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/15 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-14 md:mb-18 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
            <Sparkles size={16} /> A Special Moment For You <Sparkles size={16} />
          </p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-5xl text-burgundy mb-4">
            Make a Wish, Baby ❤️
          </h2>
          <p className="text-romantic text-lg sm:text-xl text-dusty-pink italic max-w-md mx-auto">
            "Every candle carries a hope, every tier holds a memory, and today is all about celebrating you."
          </p>
        </motion.div>

        {/* Spacious 3-Tier Cake Display */}
        <motion.div
          className="relative flex flex-col items-center justify-center my-14 md:my-20 w-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-8 sm:gap-10 md:gap-12 mb-[-2px] z-30">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {stage < 2 ? (
                    <motion.div
                      className="relative flex items-center justify-center mb-1"
                      animate={{
                        scaleY: [1, 1.15, 0.92, 1.18, 1],
                        scaleX: [1, 0.88, 1.05, 0.9, 1],
                        rotate: [0, 2, -2, 1, 0],
                      }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        y: -30,
                        transition: { duration: 0.4 },
                      }}
                    >
                      {/* Outer Glow Aura */}
                      <div
                        className="absolute w-8 h-10 rounded-full blur-sm opacity-60"
                        style={{ background: 'radial-gradient(circle, #FFD700, #FF4500, transparent)' }}
                      />
                      {/* Inner Flame */}
                      <div
                        className="w-3.5 sm:w-4 h-6 sm:h-7 rounded-full relative z-10"
                        style={{
                          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF275 30%, #FF8C00 70%, #FF4500 100%)',
                          boxShadow: '0 0 12px #FFD700, 0 0 25px rgba(255, 140, 0, 0.7)',
                          borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                        }}
                      />
                    </motion.div>
                  ) : (
                    /* Smoke wisps after blowing */
                    <motion.div
                      className="w-1.5 h-6 rounded-full bg-slate-300/60 blur-xs mb-1"
                      initial={{ opacity: 0.8, y: 0, scaleX: 1 }}
                      animate={{ opacity: 0, y: -25, scaleX: 2 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div
                  className="w-3 sm:w-3.5 h-14 sm:h-16 md:h-18 rounded-t-sm border-x border-t border-white/50 shadow-md relative overflow-hidden"
                  style={{
                    background:
                      i === 1
                        ? 'repeating-linear-gradient(45deg, #FFF, #FFF 6px, #F4A7C1 6px, #F4A7C1 12px)'
                        : 'repeating-linear-gradient(-45deg, #FFF, #FFF 6px, #EFA3B8 6px, #EFA3B8 12px)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-800/40" />
                </div>
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <motion.div
            className="relative rounded-t-3xl flex items-center justify-center z-25 shadow-md border border-white/70"
            style={{
              width: 'min(90vw, 220px)',
              height: '80px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FCE4EC 40%, #F8C8DC 100%)',
              boxShadow: '0 8px 20px rgba(125, 41, 74, 0.12)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Piped Icing Droplets on rim */}
            <div className="absolute -top-1.5 left-0 right-0 flex justify-around px-2">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="w-4 h-3 rounded-full bg-white shadow-xs border-b border-pink-100" />
              ))}
            </div>

            {/* Frosting Drips */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 rounded-full bg-white/90 shadow-xs" />
            <div className="absolute -bottom-3 left-20 w-4 h-5 rounded-full bg-white/80 shadow-xs" />
            <div className="absolute -bottom-2.5 right-12 w-4 h-4 rounded-full bg-white/90 shadow-xs" />

            {/* Top Tier Garnishes */}
            <div className="flex items-center justify-center gap-4 text-base sm:text-lg select-none">
              <span title="Flower">🌸</span>
              <span title="Strawberry">🍓</span>
              <span className="text-xs text-rose-gold font-serif font-bold">11·11</span>
              <span title="Strawberry">🍓</span>
              <span title="Flower">🌸</span>
            </div>
          </motion.div>

          {/* Middle Tier */}
          <motion.div
            className="relative rounded-2xl flex items-center justify-center z-20 shadow-lg border border-white/60 -mt-1.5"
            style={{
              width: 'min(92vw, 320px)',
              height: '92px',
              background: 'linear-gradient(180deg, #F8C8DC 0%, #F4A7C1 50%, #EFA3B8 100%)',
              boxShadow: '0 12px 28px rgba(125, 41, 74, 0.16)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Golden Lace Ribbon */}
            <div className="absolute top-3 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent shadow-xs" />

            {/* Decorative Motifs */}
            <div className="flex items-center justify-center gap-5 sm:gap-6 text-base sm:text-lg select-none">
              <span>✨</span>
              <span>🌹</span>
              <span className="text-white/90 text-sm font-script tracking-wider">Sweet Dishu</span>
              <span>🌹</span>
              <span>✨</span>
            </div>
          </motion.div>

          {/* Bottom Tier */}
          <motion.div
            className="relative rounded-b-3xl rounded-t-xl flex items-center justify-center z-15 shadow-xl border border-white/40 -mt-1.5"
            style={{
              width: 'min(94vw, 420px)',
              height: '105px',
              background: 'linear-gradient(180deg, #F4A7C1 0%, #D98CA8 45%, #7D294A 100%)',
              boxShadow: '0 18px 40px rgba(125, 41, 74, 0.25)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Pearl Scallop Border */}
            <div className="absolute top-2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-100/70 to-transparent" />

            {/* Bottom Tier Inscription */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-white select-none">
              <span className="text-lg">💖</span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/95 font-medium drop-shadow-sm">
                Happy Birthday Baby ❤️
              </span>
              <span className="text-lg">💖</span>
            </div>

            {/* If cut, show slice cut line */}
            {stage === 4 && (
              <motion.div
                className="absolute right-14 top-0 bottom-0 w-1 bg-amber-100/80 shadow-md"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.div>

          {/* Cake Platter (Plate) */}
          <div
            className="rounded-full z-10 -mt-1 shadow-2xl relative"
            style={{
              width: 'min(96vw, 490px)',
              height: '20px',
              background: 'linear-gradient(90deg, #E5E7EB 0%, #FFFFFF 25%, #F7E7CE 50%, #FFFFFF 75%, #E5E7EB 100%)',
              boxShadow: '0 16px 40px rgba(125, 41, 74, 0.3), 0 2px 6px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          />

          {/* Pedestal Base */}
          <div
            className="rounded-b-2xl -mt-1 opacity-90 shadow-md"
            style={{
              width: 'min(50vw, 200px)',
              height: '24px',
              background: 'linear-gradient(180deg, #E5E7EB 0%, #D1D5DB 60%, #9CA3AF 100%)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            }}
          />
        </motion.div>

        {/* Spacious Interactive Controls Area */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center my-8 min-h-[140px]">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="wish"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-romantic text-xl md:text-2xl text-dusty-pink italic">
                  Close your eyes and make your heartfelt wish...
                </p>
                <button
                  onClick={() => setStage(1)}
                  className="px-10 py-4 rounded-full text-white font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl border border-white/30"
                  style={{
                    background: 'linear-gradient(135deg, #F4A7C1, #D98CA8)',
                    boxShadow: '0 12px 35px rgba(244, 167, 193, 0.45)',
                  }}
                >
                  I've Made My Wish ✨
                </button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="blow"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-romantic text-xl md:text-2xl text-burgundy italic font-semibold">
                  Take a deep breath and blow out your candles!
                </p>
                <button
                  onClick={handleBlow}
                  className="px-10 py-4 rounded-full text-white font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl border border-white/30 animate-pulse-soft"
                  style={{
                    background: 'linear-gradient(135deg, #D98CA8, #7D294A)',
                    boxShadow: '0 12px 35px rgba(125, 41, 74, 0.4)',
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <Wind size={22} className="animate-bounce" />
                    Blow Out Your Candles ♡
                  </span>
                </button>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="celebration"
                className="flex flex-col items-center gap-4 text-center px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-handwritten text-3xl md:text-4xl text-burgundy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  May every wish your heart whispers come true today!
                </motion.p>
                <div className="flex items-center justify-center gap-3 text-2xl pt-2">
                  {['🎉', '✨', '🎂', '🌟', '🎊'].map((e, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
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
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-romantic text-xl md:text-2xl text-dusty-pink italic">
                  Now for the sweet celebration...
                </p>
                <button
                  onClick={handleCut}
                  className="px-10 py-4 rounded-full text-white font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl border border-white/30"
                  style={{
                    background: 'linear-gradient(135deg, #F4A7C1, #7D294A)',
                    boxShadow: '0 12px 35px rgba(125, 41, 74, 0.4)',
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <Cake size={22} />
                    Cut Our Cake Together ♡
                  </span>
                </button>
              </motion.div>
            )}

            {stage === 4 && (
              <motion.div
                key="done"
                className="flex flex-col items-center w-full mt-4"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-md border border-blush/50 max-w-lg mx-auto shadow-2xl flex flex-col items-center text-center"
                  style={{ boxShadow: '0 25px 60px rgba(125, 41, 74, 0.15)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-blush/30 flex items-center justify-center mb-4 text-burgundy">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <p className="text-romantic text-xl sm:text-2xl text-burgundy italic px-2 sm:px-6 leading-relaxed">
                    "Here's to endless laughter, shared adventures, sweet slices of happiness, and loving you more with every passing day."
                  </p>
                  <p className="text-handwritten text-3xl sm:text-4xl text-dusty-pink mt-5 font-bold">
                    Happy Birthday Baby ❤️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}