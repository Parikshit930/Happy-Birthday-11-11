import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [stage, setStage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5500),
      setTimeout(() => setStage(4), 7500),
      setTimeout(() => setShowButton(true), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #1a0a12 0%, #0a0005 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: `rgba(244, 167, 193, ${Math.random() * 0.5 + 0.1})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Central glowing particle */}
        <motion.div
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0.8], opacity: [0, 1, 0.6] }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div
            className="w-3 h-3 rounded-full animate-glow"
            style={{
              background: 'radial-gradient(circle, #F4A7C1, #EFA3B8)',
              boxShadow: '0 0 30px rgba(244, 167, 193, 0.6), 0 0 60px rgba(244, 167, 193, 0.3)',
            }}
          />
        </motion.div>

        {/* Text content */}
        <div className="relative z-10 text-center px-6 max-w-lg">
          <AnimatePresence mode="wait">
            {stage >= 1 && (
              <motion.p
                key="line1"
                className="text-romantic text-xl md:text-2xl text-blush/90 mb-6 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                "Some people make the world feel a little more beautiful..."
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {stage >= 2 && (
              <motion.p
                key="line2"
                className="text-romantic text-2xl md:text-3xl text-rose-soft mb-10 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                "And then there's you."
              </motion.p>
            )}
          </AnimatePresence>

          {/* Rose bloom */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                className="text-6xl mb-8"
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 2, type: 'spring', stiffness: 50 }}
              >
                🌹
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enter button */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <button
                onClick={handleEnter}
                className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F4A7C1, #EFA3B8)',
                  boxShadow: '0 0 30px rgba(244, 167, 193, 0.4), 0 10px 40px rgba(244, 167, 193, 0.2)',
                }}
              >
                <span className="relative z-10 text-white font-medium text-lg tracking-wide">
                  Enter Your Little Universe ♡
                </span>
                <div className="absolute inset-0 animate-shimmer" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Skip button */}
        <motion.button
          className="absolute bottom-8 right-8 text-blush/40 hover:text-blush/70 text-sm transition-colors duration-300"
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Skip Intro →
        </motion.button>

        {/* Falling petals overlay */}
        {stage >= 4 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%',
                }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  opacity: [0, 0.8, 0.6, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 4 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear',
                }}
              >
                <div
                  className="w-3 h-4 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #F8C8DC, #F4A7C1)`,
                    borderRadius: '50% 0 50% 50%',
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
