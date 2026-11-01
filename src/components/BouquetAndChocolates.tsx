import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RainingItem {
  id: number;
  emoji: string;
  name: string;
  x: number; // percentage 0 - 95
  duration: number; // 4 to 8s
  delay: number;
  size: number; // 24 to 42px
  rotation: number;
}

const CHOCOLATE_TYPES = [
  { emoji: '🍫', name: 'Dairy Milk Bar' },
  { emoji: '🍬', name: 'Strawberry Truffle' },
  { emoji: '🤎', name: 'Ferrero Rocher' },
  { emoji: '🍩', name: 'Chocolate Donut' },
  { emoji: '🧁', name: 'Red Velvet Cupcake' },
  { emoji: '🍓', name: 'Choco-dipped Strawberry' },
  { emoji: '🍪', name: 'Warm Choco Cookie' },
  { emoji: '✨', name: 'Golden Sparkle' },
];

const SWEET_MESSAGES = [
  "You're sweeter than all the chocolate in the world, Dishu! 🍫",
  "A golden Ferrero Rocher for the most precious girl ✨",
  "Lifetime supply of your favourite Dairy Milk unlocked! 💝",
  "Warning: Dishu's smile is 1000x sweeter than sugar! 🍬",
  "1 chocolate caught = 100 hugs and kisses for you 🥰",
  "Made specially with infinite love for Disha ❤️",
  "Sweet treats for the prettiest birthday princess 👑",
  "You make every single day feel like a celebration 🍓",
  "Nothing in this world can match your sweetness baby 🍫",
];

export default function BouquetAndChocolates() {
  const [rainingChocolates, setRainingChocolates] = useState<RainingItem[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [floatingNote, setFloatingNote] = useState<string | null>(null);
  const [bouquetCardOpen, setBouquetCardOpen] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize raining chocolates
  useEffect(() => {
    const items: RainingItem[] = Array.from({ length: 24 }).map((_, i) => {
      const type = CHOCOLATE_TYPES[Math.floor(Math.random() * CHOCOLATE_TYPES.length)];
      return {
        id: i,
        emoji: type.emoji,
        name: type.name,
        x: Math.random() * 92 + 4, // 4% to 96%
        duration: 5 + Math.random() * 4, // 5s to 9s
        delay: Math.random() * 6,
        size: 26 + Math.random() * 18,
        rotation: (Math.random() - 0.5) * 60,
      };
    });
    setRainingChocolates(items);
  }, []);

  // Make a shower of chocolates
  const triggerChocolateShower = (e?: React.MouseEvent) => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 1200);

    // Multi-color confetti burst with heart shapes
    try {
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#7D294A', '#E892A2', '#F7D6DC', '#D4AF37', '#6A1B38'],
        shapes: ['circle', 'square'],
      });
    } catch {}

    // Add 8 bonus fast-falling chocolates
    const bonusItems: RainingItem[] = Array.from({ length: 8 }).map((_, i) => {
      const type = CHOCOLATE_TYPES[Math.floor(Math.random() * CHOCOLATE_TYPES.length)];
      return {
        id: Date.now() + i,
        emoji: type.emoji,
        name: type.name,
        x: Math.random() * 90 + 5,
        duration: 3 + Math.random() * 2,
        delay: 0.1 * i,
        size: 32 + Math.random() * 14,
        rotation: (Math.random() - 0.5) * 90,
      };
    });

    setRainingChocolates(prev => [...prev.slice(-18), ...bonusItems]);
    setFloatingNote("✨ A storm of sweetness for baby! ✨");
    setTimeout(() => setFloatingNote(null), 3000);
  };

  const handleCatchChocolate = (item: RainingItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setCaughtCount(prev => prev + 1);

    const randomMsg = SWEET_MESSAGES[Math.floor(Math.random() * SWEET_MESSAGES.length)];
    setFloatingNote(randomMsg);
    setTimeout(() => setFloatingNote(null), 3500);

    // Mini confetti at click location
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left / window.innerWidth;
      const y = rect.top / window.innerHeight;
      confetti({
        particleCount: 18,
        spread: 45,
        origin: { x, y },
        colors: ['#E892A2', '#F7D6DC', '#8B4513', '#D4AF37'],
      });
    } catch {}
  };

  const handleBouquetClick = () => {
    setBouquetCardOpen(prev => !prev);
    try {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#E892A2', '#FF4D6D', '#FFB703', '#FFFFFF'],
      });
    } catch {}
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden flex flex-col items-center justify-center w-full min-w-full bg-gradient-to-b from-cream via-blush/20 to-cream"
    >
      {/* Gentle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-pink/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* RAINING CHOCOLATES LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {rainingChocolates.map((item) => (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer pointer-events-auto select-none filter drop-shadow-md hover:scale-125 transition-transform"
            style={{
              left: `${item.x}%`,
              fontSize: `${item.size}px`,
              top: '-60px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`0px`, `${(item.id % 2 === 0 ? 1 : -1) * 25}px`, '0px'],
              rotate: [item.rotation, item.rotation + 180, item.rotation + 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            onClick={(e) => handleCatchChocolate(item, e)}
            title="Tap to catch chocolate!"
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Floating Sweet Alert popup */}
      <AnimatePresence>
        {floatingNote && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            className="fixed top-24 z-[100] px-6 py-3 rounded-full bg-white/95 border-2 border-rose-pink shadow-2xl backdrop-blur-md text-burgundy text-sm sm:text-base font-medium flex items-center gap-2 max-w-md mx-auto text-center"
          >
            <span>🍫</span>
            <span>{floatingNote}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/15 text-burgundy text-xs uppercase tracking-[0.25em] font-semibold mb-4 border border-rose-pink/25">
            <Sparkles size={13} className="text-rose-gold animate-spin" />
            Special Sweet Delivery
            <Sparkles size={13} className="text-rose-gold animate-spin" />
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-burgundy mb-4 tracking-tight leading-tight">
            Forever Blooming Bouquet <br className="hidden sm:block" />
            <span className="font-cursive text-rose-pink text-5xl sm:text-6xl md:text-7xl lowercase">
              & endless chocolates
            </span>
          </h2>
          <p className="text-dusty-pink text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Real flowers wither with time, but this bouquet was crafted with eternal love that never fades. 
            Tap the bouquet to read your card, and tap the falling chocolates to catch your sweet surprises!
          </p>

          {/* Caught counter */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/80 border border-blush/60 px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-sm text-burgundy font-medium">Chocolates Caught:</span>
            <span className="text-rose-pink font-bold text-base px-2 py-0.5 rounded-md bg-rose-pink/10">
              {caughtCount} 🍫
            </span>
            {caughtCount > 0 && (
              <span className="text-xs text-dusty-pink italic ml-1">
                {caughtCount >= 10 ? '⭐ Queen of Sweets!' : 'keep tapping!'}
              </span>
            )}
          </div>
        </motion.div>

        {/* FLOATING FLOWER BOUQUET CONTAINER */}
        <div className="relative my-6 sm:my-10 flex flex-col items-center justify-center">
          {/* Subtle glowing halo behind bouquet */}
          <motion.div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-pink/30 to-blush/40 blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.85, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating animated bouquet element */}
          <motion.div
            className="relative cursor-pointer select-none group"
            animate={{
              y: [-12, 14, -12],
              rotate: [-2, 2.5, -2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBouquetClick}
          >
            {/* Bouquet Visual Composition */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
              {/* Rich SVG Illustration of a Luxurious Rose & Flower Bouquet */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-[0_20px_35px_rgba(125,41,74,0.25)] filter"
              >
                <defs>
                  {/* Gradients for Petals */}
                  <linearGradient id="roseRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E63946" />
                    <stop offset="50%" stopColor="#C9184A" />
                    <stop offset="100%" stopColor="#800F2F" />
                  </linearGradient>

                  <linearGradient id="rosePink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB3C6" />
                    <stop offset="60%" stopColor="#FF758F" />
                    <stop offset="100%" stopColor="#C9184A" />
                  </linearGradient>

                  <linearGradient id="petalBlush" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF0F3" />
                    <stop offset="70%" stopColor="#FFCCD5" />
                    <stop offset="100%" stopColor="#FF758F" />
                  </linearGradient>

                  <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#997B1A" />
                  </linearGradient>

                  <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#74C69D" />
                    <stop offset="60%" stopColor="#40916C" />
                    <stop offset="100%" stopColor="#1B4332" />
                  </linearGradient>

                  <linearGradient id="wrapPaper" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF5EB" />
                    <stop offset="50%" stopColor="#FDE2E4" />
                    <stop offset="100%" stopColor="#FAD2E1" />
                  </linearGradient>
                </defs>

                {/* Kraft/Blush Wrapping Paper Cone */}
                <path
                  d="M140 230 L200 375 L260 230 Q200 245 140 230 Z"
                  fill="url(#wrapPaper)"
                  stroke="#E29578"
                  strokeWidth="2"
                  opacity="0.95"
                />
                <path
                  d="M130 220 L200 375 L180 230 Z"
                  fill="#FAD2E1"
                  opacity="0.6"
                />
                <path
                  d="M270 220 L200 375 L220 230 Z"
                  fill="#F4ACB7"
                  opacity="0.5"
                />

                {/* Eucalyptus and Fern Leaves */}
                <g fill="url(#leafGreen)" opacity="0.9">
                  <path d="M120 180 Q90 140 100 110 Q130 140 135 175 Z" />
                  <path d="M280 180 Q310 140 300 110 Q270 140 265 175 Z" />
                  <path d="M170 140 Q150 90 170 65 Q185 95 180 135 Z" />
                  <path d="M230 140 Q250 90 230 65 Q215 95 220 135 Z" />
                  <path d="M90 210 Q60 190 75 160 Q105 180 105 205 Z" />
                  <path d="M310 210 Q340 190 325 160 Q295 180 295 205 Z" />
                </g>

                {/* Baby's breath little white flowers */}
                <g fill="#FFFFFF" stroke="#FFCCD5" strokeWidth="1">
                  <circle cx="110" cy="140" r="5" />
                  <circle cx="118" cy="135" r="4" />
                  <circle cx="105" cy="148" r="4.5" />
                  <circle cx="290" cy="140" r="5" />
                  <circle cx="282" cy="135" r="4" />
                  <circle cx="295" cy="148" r="4.5" />
                  <circle cx="150" cy="100" r="4.5" />
                  <circle cx="250" cy="100" r="4.5" />
                  <circle cx="200" cy="80" r="5" />
                </g>

                {/* Left Deep Red Rose */}
                <g transform="translate(145, 175)">
                  <circle cx="0" cy="0" r="32" fill="url(#roseRed)" />
                  <path d="M-15 -10 Q0 -25 15 -10 Q25 15 0 24 Q-25 15 -15 -10 Z" fill="#800F2F" opacity="0.6" />
                  <circle cx="0" cy="0" r="18" fill="url(#rosePink)" />
                  <path d="M-8 -6 Q0 -14 8 -6 Q12 8 0 12 Q-12 8 -8 -6 Z" fill="#A4133C" />
                  <circle cx="0" cy="0" r="7" fill="#590D22" />
                </g>

                {/* Right Soft Pink Rose */}
                <g transform="translate(255, 175)">
                  <circle cx="0" cy="0" r="32" fill="url(#rosePink)" />
                  <path d="M-15 -10 Q0 -25 15 -10 Q25 15 0 24 Q-25 15 -15 -10 Z" fill="#C9184A" opacity="0.5" />
                  <circle cx="0" cy="0" r="18" fill="url(#petalBlush)" />
                  <path d="M-8 -6 Q0 -14 8 -6 Q12 8 0 12 Q-12 8 -8 -6 Z" fill="#FF758F" />
                  <circle cx="0" cy="0" r="7" fill="#C9184A" />
                </g>

                {/* Top Center Grand Crimson Rose */}
                <g transform="translate(200, 130)">
                  <circle cx="0" cy="0" r="38" fill="url(#roseRed)" />
                  <path d="M-20 -12 Q0 -32 20 -12 Q32 20 0 30 Q-32 20 -20 -12 Z" fill="#590D22" opacity="0.7" />
                  <circle cx="0" cy="0" r="23" fill="url(#rosePink)" />
                  <path d="M-12 -8 Q0 -18 12 -8 Q18 12 0 16 Q-18 12 -12 -8 Z" fill="#800F2F" />
                  <circle cx="0" cy="0" r="10" fill="#FFF0F3" opacity="0.8" />
                  <circle cx="0" cy="0" r="6" fill="#A4133C" />
                </g>

                {/* Center Sweet Peony / Peach Rose */}
                <g transform="translate(200, 195)">
                  <circle cx="0" cy="0" r="34" fill="url(#petalBlush)" />
                  <path d="M-18 -10 Q0 -28 18 -10 Q28 18 0 26 Q-28 18 -18 -10 Z" fill="#FF758F" opacity="0.6" />
                  <circle cx="0" cy="0" r="20" fill="url(#rosePink)" />
                  <circle cx="0" cy="0" r="11" fill="url(#roseRed)" />
                  <circle cx="0" cy="0" r="5" fill="#FFE5EC" />
                </g>

                {/* Silky Golden Bow & Ribbon on the Bouquet Stem */}
                <g transform="translate(200, 280)">
                  {/* Left Ribbon loop */}
                  <path d="M0 0 C-35 -25 -50 0 -15 15 C-5 7 0 0 0 0 Z" fill="url(#goldRibbon)" stroke="#B8860B" strokeWidth="1" />
                  {/* Right Ribbon loop */}
                  <path d="M0 0 C35 -25 50 0 15 15 C5 7 0 0 0 0 Z" fill="url(#goldRibbon)" stroke="#B8860B" strokeWidth="1" />
                  {/* Ribbon tails hanging down */}
                  <path d="M-6 8 Q-25 45 -35 70 Q-15 55 -5 20 Z" fill="url(#goldRibbon)" opacity="0.9" />
                  <path d="M6 8 Q25 45 35 70 Q15 55 5 20 Z" fill="url(#goldRibbon)" opacity="0.9" />
                  {/* Bow Center knot */}
                  <circle cx="0" cy="5" r="9" fill="url(#goldRibbon)" stroke="#B8860B" strokeWidth="1" />
                  <circle cx="0" cy="5" r="4" fill="#FFD700" />
                </g>
              </svg>

              {/* Little tag attached to ribbon with heartbeat pulse */}
              <motion.div
                className="absolute bottom-10 right-4 sm:right-8 bg-white/95 border border-blush rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5 text-xs font-serif text-burgundy cursor-pointer"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>💌</span>
                <span className="font-semibold underline decoration-rose-pink">Tap for card</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Card Popup attached to Bouquet */}
          <AnimatePresence>
            {bouquetCardOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                className="mt-4 p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-blush shadow-2xl max-w-md w-full text-center relative backdrop-blur-md"
              >
                <div className="text-3xl mb-2">💐❤️🍫</div>
                <h3 className="font-serif text-2xl text-burgundy font-bold mb-2">
                  To: My Disha Ji (Baby)
                </h3>
                <p className="text-sm font-sans text-gray-700 leading-relaxed mb-4 italic">
                  "Every petal in this bouquet carries a promise — to always cherish you, make you laugh, 
                  stand beside you through thick and thin, and shower you with all the sweetest chocolates in the world. 
                  You are the prettiest blessing in my life."
                </p>
                <div className="text-xs tracking-wider uppercase text-rose-gold font-bold">
                  Forever Yours, Parikshit ♡
                </div>
                <button
                  onClick={() => setBouquetCardOpen(false)}
                  className="mt-4 text-xs text-dusty-pink hover:text-burgundy transition-colors underline"
                >
                  Close Note
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerChocolateShower}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-pink via-burgundy to-rose-pink text-white font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base border border-white/20"
          >
            <Sparkles size={18} className={isSparkling ? 'animate-spin' : ''} />
            <span>🍫 Rain More Chocolates!</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBouquetClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 text-burgundy font-medium border border-blush shadow-md hover:bg-white transition-all text-sm sm:text-base"
          >
            <Heart size={16} className="text-rose-pink" fill="currentColor" />
            <span>{bouquetCardOpen ? "Hide Love Card" : "Read Bouquet Card 💌"}</span>
          </motion.button>
        </div>

        {/* Sweet Bottom Teaser */}
        <p className="text-xs text-dusty-pink mt-6 italic">
          Tip: Chocolates will keep raining gently — click or tap any falling treat to catch it! ✨
        </p>
      </div>
    </section>
  );
}
