import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { config } from '../data/config';

function getTimeUntilBirthday() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let birthday = new Date(currentYear, config.birthdayMonth - 1, config.birthdayDay);
  
  if (now > birthday) {
    birthday = new Date(currentYear + 1, config.birthdayMonth - 1, config.birthdayDay);
  }
  
  const diff = birthday.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isBirthday: days === 0 && hours === 0 };
}

function getBirthdayStatus() {
  const now = new Date();
  const isBirthday = now.getMonth() === config.birthdayMonth - 1 && now.getDate() === config.birthdayDay;
  const isPast = now > new Date(now.getFullYear(), config.birthdayMonth - 1, config.birthdayDay);
  return { isBirthday, isPast };
}

export default function Hero() {
  const [time, setTime] = useState(getTimeUntilBirthday());
  const { isBirthday, isPast } = getBirthdayStatus();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilBirthday());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #FFF8F5 0%, #F8C8DC 25%, #FFF8F5 50%, #F7E7CE 75%, #FFF8F5 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating orbs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            background: `radial-gradient(circle, ${i % 2 === 0 ? '#F4A7C1' : '#F7E7CE'}, transparent)`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Photo frame */}
        <motion.div
          className="mx-auto mb-10 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
          style={{
            border: '4px solid rgba(244, 167, 193, 0.5)',
            boxShadow: '0 20px 60px rgba(244, 167, 193, 0.3), 0 0 40px rgba(244, 167, 193, 0.1)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 50 }}
          whileHover={{ scale: 1.05, boxShadow: '0 25px 70px rgba(244, 167, 193, 0.4)' }}
        >
          {config.heroPhoto ? (
            <img src={config.heroPhoto} alt={config.herName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blush to-rose-soft">
              <span className="text-6xl">🌸</span>
            </div>
          )}
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-rose-gold text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          11 · 11 · 2005
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="text-display text-4xl md:text-6xl lg:text-7xl text-burgundy mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {config.heroHeading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-romantic text-xl md:text-2xl text-dusty-pink mb-8 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {config.heroSubheading}
        </motion.p>

        {/* Birthday countdown or celebration */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {isBirthday ? (
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="text-rose-gold" size={20} />
              <p className="text-romantic text-xl text-burgundy">Today is the day! Happy Birthday!</p>
              <Sparkles className="text-rose-gold" size={20} />
            </div>
          ) : isPast ? (
            <p className="text-romantic text-lg text-dusty-pink italic">
              This year's celebration was beautiful. Here's to many more. ♡
            </p>
          ) : (
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { value: time.days, label: 'Days' },
                { value: time.hours, label: 'Hours' },
                { value: time.minutes, label: 'Minutes' },
                { value: time.seconds, label: 'Seconds' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 mb-2">
                    <span className="text-display text-2xl md:text-4xl text-burgundy font-bold">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-rose-gold uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Handwritten message */}
        <motion.p
          className="text-handwritten text-2xl md:text-3xl text-dusty-pink max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {config.heroMessage}
        </motion.p>

        {/* Floating hearts */}
        <motion.div
          className="absolute -top-10 left-10 text-rose-soft/30"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 text-blush/40"
          animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Heart size={18} fill="currentColor" />
        </motion.div>

        {/* Floating butterflies */}
        <motion.span
          className="absolute top-1/4 left-[10%] text-2xl hidden md:block"
          animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          🦋
        </motion.span>
        <motion.span
          className="absolute bottom-1/4 right-[15%] text-xl hidden md:block"
          animate={{ y: [0, -20, 0], x: [0, -10, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          🦋
        </motion.span>

        {/* Sparkle stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute hidden md:block"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
          >
            <Sparkles size={12} className="text-champagne/60" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
