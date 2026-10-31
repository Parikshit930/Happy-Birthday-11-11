import { motion } from 'framer-motion';
import { useInView } from '../hooks/useHooks';
import { config } from '../data/config';

function TimelineItem({ item, index }: { item: typeof config.timeline[0]; index: number }) {
  const [ref, isInView] = useInView(0.2);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Photo */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(125, 41, 74, 0.15)',
            border: '3px solid rgba(244, 167, 193, 0.3)',
          }}
        >
          {item.photo ? (
            <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blush/50 to-champagne/50 flex items-center justify-center">
              <span className="text-5xl opacity-50">📸</span>
            </div>
          )}
          {/* Chapter number overlay */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-burgundy/80 flex items-center justify-center">
            <span className="text-white text-sm font-bold">{item.chapter}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.p
          className="text-rose-gold text-sm tracking-[0.2em] uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {item.date}
        </motion.p>
        <motion.h3
          className="text-display text-2xl md:text-3xl text-burgundy mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-romantic text-lg text-dusty-pink leading-relaxed italic"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {item.message}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function StoryTimeline() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          ref={ref}
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h2 className="text-display text-3xl md:text-5xl text-burgundy mb-4">
            Every Beautiful Story Has Its Own
          </h2>
          <h2 className="text-handwritten text-3xl md:text-4xl text-dusty-pink">
            Little Universe.
          </h2>
        </motion.div>

        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-1/3 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-soft/30 to-transparent" />

        {/* Timeline items */}
        {config.timeline.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
