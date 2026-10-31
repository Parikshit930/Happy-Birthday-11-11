import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';

function ReasonCard({ reason, index }: { reason: typeof config.reasons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000 cursor-pointer"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => setFlipped(!flipped)}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="relative w-full h-48 md:h-56 transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(248, 200, 220, 0.8), rgba(244, 167, 193, 0.6))',
            border: '1px solid rgba(244, 167, 193, 0.3)',
            boxShadow: '0 10px 30px rgba(244, 167, 193, 0.15)',
          }}
        >
          <Heart size={24} className="text-burgundy mb-3" fill="currentColor" />
          <h4 className="text-display text-lg md:text-xl text-burgundy text-center">
            {reason.title}
          </h4>
          <p className="text-xs text-dusty-pink mt-2 opacity-60">Tap to read more</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #7D294A, #D98CA8)',
            boxShadow: '0 10px 30px rgba(125, 41, 74, 0.2)',
          }}
        >
          <p className="text-romantic text-base md:text-lg text-white text-center italic leading-relaxed">
            {reason.message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReasonsILoveYou() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-pearl to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">For You</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Little Things That Make You,
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            YOU.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {config.reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
