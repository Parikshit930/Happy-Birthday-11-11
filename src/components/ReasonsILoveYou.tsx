import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, Eye } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';
import confetti from 'canvas-confetti';

const curiousTexts = [
  "Curious? Tap to reveal a secret ♡",
  "A little thing I adore about you... Tap me ✨",
  "Can you guess what this is? Tap to see ♡",
  "Tap to unlock this thought, Dishu ✨",
  "Something you do that melts my heart... Tap me ♡",
  "A sweet little secret just for you ✨",
  "Why I fall for you every single day... Tap here ♡",
  "One of my favorite details about you ✨",
  "Tap to see what makes my world brighter ♡",
  "A secret reason... Tap to open ✨",
  "Something irreplaceable about you ♡",
  "Curious? Tap to peek inside ✨",
  "Tap to reveal another piece of my heart ♡",
  "A little reminder of how special you are ✨",
  "Something that makes you uniquely you ♡",
  "The best part of my life... Tap to reveal ✨",
];

function ReasonCard({ reason, index }: { reason: typeof config.reasons[0]; index: number }) {
  const [revealed, setRevealed] = useState(false);

  const handleTap = () => {
    const next = !revealed;
    setRevealed(next);
    if (next) {
      // Tiny celebratory sparkle
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#F8C8DC', '#F4A7C1', '#7D294A'],
        scalar: 0.8,
      });
    }
  };

  const curiousPrompt = curiousTexts[index % curiousTexts.length];

  return (
    <motion.div
      className="w-full max-w-xs mx-auto select-none"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={handleTap}
    >
      <div
        className="relative w-full h-[230px] rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-500 shadow-md hover:shadow-2xl border cursor-pointer overflow-hidden"
        style={{
          background: revealed
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F8 50%, #FCE4EC 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 200, 220, 0.4))',
          borderColor: revealed ? '#7D294A' : 'rgba(244, 167, 193, 0.4)',
          boxShadow: revealed
            ? '0 16px 40px rgba(125, 41, 74, 0.22)'
            : '0 8px 25px rgba(125, 41, 74, 0.08)',
        }}
      >
        <AnimatePresence mode="wait">
          {!revealed ? (
            /* Blank Mystery State with only ONE curious text */
            <motion.div
              key="blank"
              className="flex flex-col items-center justify-center text-center p-3 w-full h-full"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mystery Sparkle Icon */}
              <motion.div
                className="w-12 h-12 rounded-full bg-blush/35 flex items-center justify-center mb-4 text-burgundy shadow-inner"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={20} className="text-rose-gold" />
              </motion.div>

              {/* Secret badge */}
              <span className="text-[11px] uppercase tracking-[0.25em] text-rose-gold font-semibold mb-3">
                Secret #{String(index + 1).padStart(2, '0')}
              </span>

              {/* The One Curious Teaser Text */}
              <p className="text-romantic text-base sm:text-lg text-burgundy italic leading-snug px-2 font-medium">
                "{curiousPrompt}"
              </p>

              <div className="mt-4 text-[11px] text-rose-soft font-medium tracking-wide flex items-center gap-1 opacity-70">
                <Lock size={11} /> Tap to unlock ♡
              </div>
            </motion.div>
          ) : (
            /* Revealed State when Disha taps */
            <motion.div
              key="revealed"
              className="flex flex-col justify-between w-full h-full text-left"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
            >
              {/* Revealed Header */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                  <Heart size={16} fill="currentColor" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-rose-gold font-bold">
                  Reason #{String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Revealed Title */}
              <h4 className="text-display text-lg sm:text-xl text-burgundy mb-2 leading-tight">
                {reason.title}
              </h4>

              {/* Revealed Message */}
              <p className="text-romantic text-sm sm:text-base text-dusty-pink italic leading-relaxed flex-grow overflow-y-auto pr-1">
                "{reason.message}"
              </p>

              {/* Centered tap to favorite / fold back footer */}
              <div className="mt-3 pt-2.5 border-t border-blush/30 flex items-center justify-center gap-1.5 text-xs text-rose-gold font-medium w-full text-center">
                <span>♡ Tap to hide again</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ReasonsILoveYou() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full min-w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14 md:mb-18 flex flex-col items-center"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
            <Sparkles size={16} /> A Little Mystery For You <Sparkles size={16} />
          </p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Little Things That Make You,
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            You, Disha.
          </h2>
          <p className="text-romantic text-base sm:text-lg text-dusty-pink italic mt-4 max-w-md mx-auto">
            "16 hidden secrets waiting for your touch. Tap each card to reveal what my heart feels."
          </p>
        </motion.div>

        {/* 16 Mystery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full justify-items-center">
          {config.reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}