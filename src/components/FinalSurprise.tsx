import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';

interface FinalSurpriseProps {
  onReplay: () => void;
}

export default function FinalSurprise({ onReplay }: FinalSurpriseProps) {
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Deep romantic background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #7D294A 0%, #D98CA8 30%, #F4A7C1 50%, #D98CA8 70%, #7D294A 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.7, 0.5, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            <div
              className="w-3 h-4"
              style={{
                background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                borderRadius: '50% 0 50% 50%',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-white/20"
            style={{ left: `${Math.random() * 100}%`, bottom: '-5%' }}
            animate={{
              y: [0, -900],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.5, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
          >
            <Heart size={12 + Math.random() * 16} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 80 + i * 40,
            height: 80 + i * 40,
            background: `radial-gradient(circle, rgba(255,255,255,0.1), transparent)`,
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5 + i, repeat: Infinity }}
        />
      ))}

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: '#F7E7CE' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          The End... Or Just The Beginning
        </motion.p>

        <motion.h2
          className="text-display text-3xl md:text-5xl text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          One Last Thing, Birthday Girl...
        </motion.h2>

        <motion.p
          className="text-romantic text-xl md:text-2xl text-white/90 italic leading-relaxed mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {config.finalMessage1}
        </motion.p>

        {/* Photo */}
        <motion.div
          className="mx-auto mb-10 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
          style={{
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 1, type: 'spring', stiffness: 50 }}
        >
          {config.heroPhoto ? (
            <img src={config.heroPhoto} alt={config.herName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-white/5">
              <span className="text-5xl">🌸</span>
            </div>
          )}
        </motion.div>

        <motion.h2
          className="text-handwritten text-4xl md:text-5xl text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 }}
        >
          {config.finalMessage2}
        </motion.h2>

        <motion.button
          className="px-8 py-4 rounded-full text-burgundy font-medium transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #FFF8F5, #F7E7CE)',
            boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2)',
          }}
          onClick={onReplay}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Play Our Little Universe Again ♡
        </motion.button>

        {/* Signature */}
        <motion.p
          className="mt-12 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Made with all my love, for {config.herName} ♡
        </motion.p>
      </motion.div>
    </section>
  );
}
