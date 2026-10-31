import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">A Letter</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Something From My Heart
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope */
            <motion.div
              key="envelope"
              className="flex flex-col items-center"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                animate={{ y: [0, -10, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
              >
                {/* Envelope body */}
                <div
                  className="w-72 h-48 md:w-96 md:h-60 rounded-2xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #F8C8DC, #F4A7C1)',
                    boxShadow: '0 20px 60px rgba(125, 41, 74, 0.2)',
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
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, #7D294A, #5a1d35)',
                        boxShadow: '0 4px 15px rgba(125, 41, 74, 0.4)',
                      }}
                    >
                      <Heart size={24} className="text-blush" fill="currentColor" />
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute bottom-4 left-4 text-blush/40 text-xs">♡</div>
                  <div className="absolute bottom-4 right-4 text-blush/40 text-xs">♡</div>
                </div>
              </motion.div>

              <motion.button
                className="mt-8 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D98CA8, #7D294A)',
                  boxShadow: '0 10px 30px rgba(125, 41, 74, 0.3)',
                }}
                whileHover={{ boxShadow: '0 15px 40px rgba(125, 41, 74, 0.4)' }}
                onClick={() => setIsOpen(true)}
              >
                <span className="flex items-center gap-2">
                  <Mail size={18} />
                  Open Something From My Heart
                </span>
              </motion.button>
            </motion.div>
          ) : (
            /* Letter content */
            <motion.div
              key="letter"
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="bg-white rounded-3xl p-8 md:p-12 relative"
                style={{
                  boxShadow: '0 30px 80px rgba(125, 41, 74, 0.15)',
                  border: '1px solid rgba(244, 167, 193, 0.3)',
                }}
              >
                {/* Decorative corner */}
                <div className="absolute top-4 left-4 text-blush/30 text-2xl">❦</div>
                <div className="absolute top-4 right-4 text-blush/30 text-2xl">❦</div>
                <div className="absolute bottom-4 left-4 text-blush/30 text-2xl">❦</div>
                <div className="absolute bottom-4 right-4 text-blush/30 text-2xl">❦</div>

                {/* Letter content */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-handwritten text-2xl md:text-3xl text-burgundy mb-8">
                    {config.letter.greeting}
                  </p>

                  <div className="space-y-5">
                    {config.letter.body.split('\n\n').map((paragraph, i) => (
                      <motion.p
                        key={i}
                        className="text-romantic text-lg md:text-xl text-dusty-pink leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="mt-10 pt-8 border-t border-blush/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <p className="text-romantic text-lg text-burgundy italic mb-2">
                      {config.letter.closing}
                    </p>
                    <p className="text-handwritten text-2xl text-dusty-pink">
                      {config.letter.signature}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Close letter button */}
              <motion.button
                className="mt-6 mx-auto block px-6 py-2 rounded-full text-dusty-pink hover:text-burgundy text-sm transition-colors"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                ← Fold the letter back
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
