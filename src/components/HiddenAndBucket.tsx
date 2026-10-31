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
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#F8C8DC', '#F4A7C1', '#7D294A'] });
    }, 1000);
  };

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Wait...</p>
          <h2 className="text-display text-3xl md:text-4xl text-burgundy mb-10">
            There's One More Thing...
          </h2>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="gift"
                className={`cursor-pointer inline-block ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                animate={!shaking ? { y: [0, -10, 0] } : {}}
                transition={!shaking ? { duration: 2, repeat: Infinity } : {}}
              >
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, #F4A7C1, #7D294A)',
                    boxShadow: '0 20px 60px rgba(125, 41, 74, 0.3)',
                  }}
                >
                  <Gift size={48} className="text-white" />
                  {/* Ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-300/60" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-300/60" />
                  {/* Bow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
                </div>
                <p className="text-romantic text-lg text-dusty-pink mt-6 italic">
                  Tap to open your surprise...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-white/90 backdrop-blur-sm"
                style={{ boxShadow: '0 30px 80px rgba(244, 167, 193, 0.2)' }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💝
                </motion.div>
                <p className="text-romantic text-xl text-burgundy leading-relaxed italic">
                  {config.hiddenMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-champagne/20 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
              className={`relative p-6 rounded-2xl text-left transition-all duration-500 ${
                checked.has(i) ? 'bg-burgundy/5' : 'bg-white/80'
              }`}
              style={{
                border: checked.has(i) ? '2px solid #7D294A' : '2px solid rgba(244, 167, 193, 0.3)',
                boxShadow: checked.has(i) ? '0 10px 30px rgba(125, 41, 74, 0.15)' : '0 5px 20px rgba(244, 167, 193, 0.1)',
              }}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="flex items-start gap-4">
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
