import { motion } from 'framer-motion';
import { useInView } from '../hooks/useHooks';
import { config } from '../data/config';

function TimelineItem({ item, index }: { item: typeof config.timeline[0]; index: number }) {
  const [ref, isInView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center w-full max-w-2xl mx-auto mb-20 md:mb-28 text-center"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Photo */}
      <motion.div
        className="w-full flex justify-center mb-8"
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="relative w-72 h-96 sm:w-80 sm:h-[26rem] md:w-96 md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl"
          style={{
            boxShadow: '0 25px 70px rgba(125, 41, 74, 0.2)',
            border: '4px solid rgba(244, 167, 193, 0.4)',
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
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-burgundy/85 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold tracking-wider">{item.chapter}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-xl mx-auto text-center px-4">
        <motion.p
          className="text-rose-gold text-sm tracking-[0.25em] uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {item.date}
        </motion.p>
        <motion.h3
          className="text-display text-2xl md:text-3xl lg:text-4xl text-burgundy mb-4 leading-snug"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-romantic text-lg md:text-xl text-dusty-pink leading-relaxed italic px-2 sm:px-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
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
    <section className="relative py-24 md:py-36 px-6 sm:px-10 md:px-16 overflow-hidden flex flex-col items-center w-full min-w-full">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
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

        {/* Timeline items */}
        <div className="flex flex-col items-center w-full">
          {config.timeline.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
