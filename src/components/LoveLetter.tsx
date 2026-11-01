import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative py-28 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full min-w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">A Letter For You</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Something From My Heart
          </h2>
          <p className="text-romantic text-base sm:text-lg text-dusty-pink italic max-w-md mx-auto">
            "Words written just for you, sealed with all my love."
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope / Letter Box Container with generous spacing */
            <motion.div
              key="envelope"
              className="flex flex-col items-center my-6 md:my-10 w-full"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative cursor-pointer select-none"
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(true)}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
              >
                {/* Envelope body */}
                <div
                  className="w-72 h-48 sm:w-80 sm:h-52 md:w-96 md:h-60 rounded-3xl relative overflow-hidden shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #F8C8DC 0%, #F4A7C1 100%)',
                    boxShadow: '0 25px 60px rgba(125, 41, 74, 0.22)',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {/* Envelope flap */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2"
                    style={{
                      background: 'linear-gradient(135deg, #EFA3B8, #D98CA8)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                  {/* Wax seal */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: 'radial-gradient(circle, #7D294A, #5a1d35)',
                        boxShadow: '0 6px 20px rgba(125, 41, 74, 0.45)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <Heart size={24} className="text-blush" fill="currentColor" />
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute bottom-4 left-5 text-blush/60 text-sm">♡</div>
                  <div className="absolute bottom-4 right-5 text-blush/60 text-sm">♡</div>
                </div>
              </motion.div>

              <motion.button
                className="mt-12 px-9 py-4 rounded-full text-white font-medium text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer border border-white/30"
                style={{
                  background: 'linear-gradient(135deg, #D98CA8, #7D294A)',
                  boxShadow: '0 12px 35px rgba(125, 41, 74, 0.35)',
                }}
                whileHover={{ boxShadow: '0 15px 45px rgba(125, 41, 74, 0.45)' }}
                onClick={() => setIsOpen(true)}
              >
                <span className="flex items-center gap-2.5">
                  <Mail size={18} />
                  Open Something From My Heart ♡
                </span>
              </motion.button>
            </motion.div>
          ) : (
            /* Letter content */
            <motion.div
              key="letter"
              className="relative w-full max-w-3xl my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-16 relative shadow-2xl"
                style={{
                  boxShadow: '0 30px 80px rgba(125, 41, 74, 0.18)',
                  border: '1.5px solid rgba(244, 167, 193, 0.4)',
                }}
              >
                {/* Decorative corners */}
                <div className="absolute top-5 left-5 text-blush/40 text-2xl">❦</div>
                <div className="absolute top-5 right-5 text-blush/40 text-2xl">❦</div>
                <div className="absolute bottom-5 left-5 text-blush/40 text-2xl">❦</div>
                <div className="absolute bottom-5 right-5 text-blush/40 text-2xl">❦</div>

                {/* Letter content */}
                <div className="max-w-2xl mx-auto px-2 sm:px-6 md:px-8 text-center flex flex-col items-center">
                  <p className="text-handwritten text-3xl md:text-5xl text-burgundy mb-8 text-center font-bold">
                    {config.letter.greeting}
                  </p>

                  <div className="space-y-6 w-full">
                    {config.letter.body.split('\n\n').map((paragraph, i) => (
                      <motion.p
                        key={i}
                        className="text-romantic text-lg md:text-xl text-dusty-pink leading-relaxed text-center mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.12 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="mt-12 pt-8 border-t border-blush/40 text-center w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <p className="text-romantic text-lg md:text-xl text-burgundy italic mb-2 text-center">
                      {config.letter.closing}
                    </p>
                    <p className="text-handwritten text-3xl md:text-4xl text-dusty-pink text-center font-bold">
                      {config.letter.signature}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Close letter button */}
              <motion.button
                className="mt-8 mx-auto block px-8 py-3 rounded-full text-dusty-pink hover:text-burgundy bg-white/80 hover:bg-white border border-blush/40 text-sm font-medium transition-all shadow-md cursor-pointer"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                ← Fold the letter back into envelope
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
