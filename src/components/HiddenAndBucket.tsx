import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sunset, Car, MapPin, Coffee, Waves, Camera, Cake, Clock, Check } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';
import confetti from 'canvas-confetti';

// ── HIDDEN SURPRISE ──
export function HiddenSurprise() {
  const [opened, setOpened] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [ref, isInView] = useInView(0.1);

  const handleOpen = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setOpened(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ['#F8C8DC', '#F4A7C1', '#7D294A', '#F7E7CE'] });
    }, 900);
  };

  return (
    <section className="relative py-28 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Wait For A Moment...</p>
          <h2 className="text-display text-3xl sm:text-4xl md:text-5xl text-burgundy mb-3">
            There's One More Thing...
          </h2>
          <p className="text-romantic text-base sm:text-lg text-dusty-pink italic max-w-md mx-auto">
            "A little secret wrapped just for you."
          </p>
        </motion.div>

        {/* Gift Box Container with generous spacing */}
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="gift"
              className="flex flex-col items-center justify-center my-8 md:my-12 w-full"
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className={`cursor-pointer pt-6 select-none ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                onClick={handleOpen}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.96 }}
                animate={!shaking ? { y: [0, -8, 0] } : {}}
                transition={!shaking ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
              >
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl flex items-center justify-center relative shadow-2xl border border-white/40"
                  style={{
                    background: 'linear-gradient(135deg, #F4A7C1 0%, #D98CA8 40%, #7D294A 100%)',
                    boxShadow: '0 25px 60px rgba(125, 41, 74, 0.35)',
                  }}
                >
                  <Gift size={56} className="text-white drop-shadow-md" />
                  {/* Vertical Ribbon */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 shadow-sm" />
                  {/* Horizontal Ribbon */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-200 shadow-sm" />
                  {/* Bow */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl filter drop-shadow">🎀</div>
                </div>
              </motion.div>

              <motion.button
                onClick={handleOpen}
                className="mt-10 px-8 py-3.5 rounded-full text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer border border-white/30"
                style={{
                  background: 'linear-gradient(135deg, #F4A7C1, #7D294A)',
                  boxShadow: '0 10px 30px rgba(125, 41, 74, 0.3)',
                }}
              >
                Tap to open your surprise ♡
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-md border border-blush/40 max-w-xl mx-auto shadow-2xl my-6 flex flex-col items-center text-center"
              style={{ boxShadow: '0 30px 80px rgba(244, 167, 193, 0.25)' }}
            >
              <motion.div
                className="text-5xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💝
              </motion.div>
              <p className="text-romantic text-xl sm:text-2xl text-burgundy leading-relaxed italic px-2 sm:px-6">
                "{config.hiddenMessage}"
              </p>
              <p className="text-handwritten text-2xl text-dusty-pink mt-6">
                Always & Forever ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── BUCKET LIST ──
const iconMap: Record<string, React.ReactNode> = {
  sunset: <Sunset size={24} />,
  car: <Car size={24} />,
  map: <MapPin size={24} />,
  coffee: <Coffee size={24} />,
  waves: <Waves size={24} />,
  camera: <Camera size={24} />,
  cake: <Cake size={24} />,
  clock: <Clock size={24} />,
};

export function BucketList() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [ref, isInView] = useInView(0.1);

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  };

  return (
    <section className="relative py-24 md:py-36 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center justify-center w-full min-w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-champagne/20 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Our Future</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-3">
            Little Adventures Still
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            Waiting For Us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {config.bucketList.map((item, i) => (
            <motion.button
              key={i}
              className={`relative p-6 sm:p-7 rounded-2xl text-left transition-all duration-500 cursor-pointer ${
                checked.has(i) ? 'bg-burgundy/10 border-burgundy' : 'bg-white/90 border-blush/40'
              }`}
              style={{
                border: checked.has(i) ? '2px solid #7D294A' : '2px solid rgba(244, 167, 193, 0.4)',
                boxShadow: checked.has(i) ? '0 10px 30px rgba(125, 41, 74, 0.15)' : '0 5px 20px rgba(125, 41, 74, 0.08)',
              }}
              onClick={() => toggle(i)}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="flex items-start gap-4 pr-6 sm:pr-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked.has(i) ? 'bg-burgundy text-white' : 'bg-blush/30 text-burgundy'
                }`}>
                  {checked.has(i) ? <Check size={24} /> : iconMap[item.icon]}
                </div>
                <div>
                  <h4 className={`text-display text-lg mb-1 transition-colors ${
                    checked.has(i) ? 'text-burgundy' : 'text-burgundy'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-romantic text-sm text-dusty-pink italic">
                    {item.description}
                  </p>
                </div>
              </div>

              {checked.has(i) && (
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Heart size={16} className="text-rose-soft" fill="currentColor" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-romantic text-lg text-dusty-pink italic">
            {checked.size > 0
              ? `${checked.size} adventure${checked.size > 1 ? 's' : ''} marked — "One Day, Definitely ♡"`
              : 'Tap each one to mark it as "One Day, Definitely ♡"'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
