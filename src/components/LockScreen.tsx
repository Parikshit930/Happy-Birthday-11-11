import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, Sparkles, Delete, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LockScreenProps {
  onUnlock: () => void;
  onStartMusic?: () => void;
}

const CORRECT_PIN = '1111';

export default function LockScreen({ onUnlock, onStartMusic }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [hintVisible, setHintVisible] = useState(false);

  const handleDigit = useCallback((digit: string) => {
    if (status === 'success') return;
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);

      if (nextPin.length === 4) {
        if (nextPin === CORRECT_PIN) {
          // Success!
          setStatus('success');
          if (onStartMusic) onStartMusic();

          // Multi-stage confetti celebration
          setTimeout(() => {
            confetti({
              particleCount: 180,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#F8C8DC', '#F4A7C1', '#FFD700', '#7D294A', '#FFFFFF'],
            });
          }, 200);

          setTimeout(() => {
            confetti({
              particleCount: 100,
              angle: 60,
              spread: 60,
              origin: { x: 0, y: 0.6 },
              colors: ['#F4A7C1', '#FFD700', '#EFA3B8'],
            });
            confetti({
              particleCount: 100,
              angle: 120,
              spread: 60,
              origin: { x: 1, y: 0.6 },
              colors: ['#F4A7C1', '#FFD700', '#EFA3B8'],
            });
          }, 700);

          // Transition to surprise
          setTimeout(() => {
            onUnlock();
          }, 2400);
        } else {
          // Wrong PIN
          setStatus('error');
          setTimeout(() => {
            setPin('');
            setStatus('idle');
            setHintVisible(true);
          }, 800);
        }
      }
    }
  }, [pin, status, onStartMusic, onUnlock]);

  const handleDelete = useCallback(() => {
    if (status === 'success') return;
    setPin(prev => prev.slice(0, -1));
    if (status === 'error') setStatus('idle');
  }, [status]);

  // Keyboard support (typing 1111 on keyboard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDelete]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #260c1c 0%, #12030a 70%, #080104 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* Floating background glowing ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3,
              height: Math.random() * 6 + 3,
              background: `rgba(244, 167, 193, ${Math.random() * 0.45 + 0.15})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Lock Interface */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
        {/* Animated Padlock Header */}
        <motion.div
          className="relative mb-6 flex items-center justify-center"
          animate={status === 'error' ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Glowing Aura Ring */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700"
            style={{
              background: status === 'success'
                ? 'radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent 70%)'
                : 'radial-gradient(circle, rgba(244, 167, 193, 0.25), transparent 70%)',
              boxShadow: status === 'success'
                ? '0 0 50px rgba(255, 215, 0, 0.6), 0 0 80px rgba(244, 167, 193, 0.4)'
                : '0 0 30px rgba(244, 167, 193, 0.3)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-500 shadow-xl"
              style={{
                background: status === 'success'
                  ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                  : 'linear-gradient(135deg, rgba(244, 167, 193, 0.2), rgba(125, 41, 74, 0.4))',
              }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Unlock size={26} className="text-white drop-shadow-md" />
                </motion.div>
              ) : (
                <Lock size={24} className="text-blush/90" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <p className="text-rose-gold text-xs tracking-[0.3em] uppercase mb-1.5 flex items-center justify-center gap-1.5">
                <Sparkles size={13} /> Protected For Disha <Sparkles size={13} />
              </p>
              <h2 className="text-display text-2xl sm:text-3xl text-white font-medium mb-1">
                Enter Passcode
              </h2>
              <p className="text-romantic text-sm text-blush/70 italic">
                {status === 'error'
                  ? "Oops! Remember our special number? ♡"
                  : "Only Disha has the secret key"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-6"
            >
              <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-1.5 font-semibold">
                Passcode Accepted ♡
              </p>
              <h2 className="text-display text-2xl sm:text-3xl text-white font-medium mb-1 drop-shadow-md">
                Happy Birthday Baby ❤️
              </h2>
              <p className="text-romantic text-base text-rose-soft italic animate-pulse">
                Unlocking your little universe... ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 PIN Indicators */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          animate={status === 'error' ? { x: [-10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((i) => {
            const isFilled = pin.length > i;
            return (
              <motion.div
                key={i}
                className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border"
                style={{
                  background: status === 'success'
                    ? '#FFD700'
                    : isFilled
                    ? '#F4A7C1'
                    : 'transparent',
                  borderColor: status === 'success'
                    ? '#FFD700'
                    : isFilled
                    ? '#F4A7C1'
                    : 'rgba(244, 167, 193, 0.4)',
                  boxShadow: isFilled
                    ? '0 0 14px rgba(244, 167, 193, 0.8)'
                    : 'none',
                }}
                animate={isFilled ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isFilled && (
                  <Heart
                    size={8}
                    className={status === 'success' ? "text-burgundy" : "text-white"}
                    fill="currentColor"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Glassmorphic Keypad */}
        <div className="grid grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-[280px] mx-auto mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <motion.button
              key={digit}
              onClick={() => handleDigit(digit)}
              disabled={status === 'success'}
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full mx-auto flex flex-col items-center justify-center text-white backdrop-blur-md border border-white/15 cursor-pointer shadow-lg transition-colors select-none"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
              }}
              whileHover={{ scale: 1.08, background: 'rgba(244, 167, 193, 0.22)' }}
              whileTap={{ scale: 0.92, background: 'rgba(244, 167, 193, 0.35)' }}
            >
              <span className="text-xl sm:text-2xl font-sans font-light">{digit}</span>
            </motion.button>
          ))}

          {/* Bottom row: Blank / Hint, 0, Backspace */}
          <div className="flex items-center justify-center">
            {hintVisible ? (
              <span className="text-[11px] text-amber-200/90 tracking-wider">11·11</span>
            ) : null}
          </div>

          <motion.button
            onClick={() => handleDigit('0')}
            disabled={status === 'success'}
            className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full mx-auto flex flex-col items-center justify-center text-white backdrop-blur-md border border-white/15 cursor-pointer shadow-lg transition-colors select-none"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
            }}
            whileHover={{ scale: 1.08, background: 'rgba(244, 167, 193, 0.22)' }}
            whileTap={{ scale: 0.92, background: 'rgba(244, 167, 193, 0.35)' }}
          >
            <span className="text-xl sm:text-2xl font-sans font-light">0</span>
          </motion.button>

          <motion.button
            onClick={handleDelete}
            disabled={status === 'success' || pin.length === 0}
            className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full mx-auto flex items-center justify-center text-white/80 backdrop-blur-md border border-transparent hover:border-white/15 cursor-pointer transition-colors select-none"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Delete size={20} />
          </motion.button>
        </div>

        {/* Helpful Romantic Hint */}
        <p className="text-xs text-blush/60 font-sans tracking-wide">
          Hint: 11·11 🎂 Our special date
        </p>
      </div>
    </motion.div>
  );
}