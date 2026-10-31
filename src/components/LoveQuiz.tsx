import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { config } from '../data/config';
import { useInView } from '../hooks/useHooks';
import confetti from 'canvas-confetti';

export default function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [ref, isInView] = useInView(0.1);

  const question = config.quizQuestions[currentQ];
  const total = config.quizQuestions.length;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F8C8DC', '#F4A7C1', '#EFA3B8', '#7D294A', '#F7E7CE'],
      });
    }
  };

  const handleClaimHug = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#F8C8DC', '#F4A7C1', '#EFA3B8', '#D98CA8', '#7D294A'],
      shapes: ['circle'],
      scalar: 1.5,
    });
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-champagne/20 to-cream" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">A Little Game</p>
          <h2 className="text-display text-3xl md:text-4xl text-burgundy mb-3">
            How Well Do You Remember
          </h2>
          <h2 className="text-handwritten text-3xl text-dusty-pink">
            Our Little World?
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${currentQ}`}
              className="bg-white rounded-3xl p-6 md:p-10 shadow-xl"
              style={{ border: '1px solid rgba(244, 167, 193, 0.3)' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-rose-gold">
                  Question {currentQ + 1} of {total}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: total }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < currentQ ? 'bg-rose-soft' : i === currentQ ? 'bg-burgundy' : 'bg-blush/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <h3 className="text-display text-xl md:text-2xl text-burgundy mb-8 text-center">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, i) => {
                  let btnClass = 'bg-cream hover:bg-blush/30 text-dusty-pink';
                  if (answered) {
                    if (i === question.correct) {
                      btnClass = 'bg-green-50 border-green-300 text-green-800';
                    } else if (i === selected && i !== question.correct) {
                      btnClass = 'bg-red-50 border-red-300 text-red-700';
                    }
                  } else if (i === selected) {
                    btnClass = 'bg-blush text-burgundy';
                  }

                  return (
                    <motion.button
                      key={i}
                      className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ${btnClass} ${
                        !answered ? 'border-transparent hover:border-rose-soft' : 'border-transparent'
                      }`}
                      onClick={() => handleAnswer(i)}
                      whileHover={!answered ? { scale: 1.02 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-sm font-medium text-burgundy">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-romantic text-lg">{option}</span>
                        {answered && i === question.correct && (
                          <CheckCircle size={20} className="ml-auto text-green-500" />
                        )}
                        {answered && i === selected && i !== question.correct && (
                          <XCircle size={20} className="ml-auto text-red-400" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-romantic text-dusty-pink italic mb-4">
                      {question.feedback}
                    </p>
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-full text-white font-medium transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #F4A7C1, #D98CA8)',
                        boxShadow: '0 8px 25px rgba(244, 167, 193, 0.3)',
                      }}
                    >
                      {currentQ < total - 1 ? 'Next Question →' : 'See My Result ♡'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Result */
            <motion.div
              key="result"
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
              style={{ border: '1px solid rgba(244, 167, 193, 0.3)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-5xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {score >= total * 0.7 ? '🎉' : score >= total * 0.4 ? '💕' : '🌸'}
              </motion.div>

              <h3 className="text-display text-2xl md:text-3xl text-burgundy mb-4">
                {score >= total * 0.7
                  ? "Looks like someone knows our little world pretty well."
                  : score >= total * 0.4
                  ? "Not bad at all — but I think you could use a few more memories together."
                  : "Aww, looks like we need to make more memories together!"}
              </h3>

              <p className="text-romantic text-lg text-dusty-pink mb-2">
                You got <span className="font-bold text-burgundy">{score}</span> out of <span className="font-bold text-burgundy">{total}</span> right
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: score }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Heart size={16} className="text-rose-soft" fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  className="px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F4A7C1, #7D294A)',
                    boxShadow: '0 10px 30px rgba(125, 41, 74, 0.3)',
                  }}
                  onClick={handleClaimHug}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} />
                    Claim Your Birthday Hug ♡
                  </span>
                </motion.button>

                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full text-dusty-pink hover:text-burgundy text-sm transition-colors"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
