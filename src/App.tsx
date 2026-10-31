import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Hero from './components/Hero';
import StoryTimeline from './components/StoryTimeline';
import MemoryGallery from './components/MemoryGallery';
import LoveLetter from './components/LoveLetter';
import LoveQuiz from './components/LoveQuiz';
import BirthdayCake from './components/BirthdayCake';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import RoseGarden from './components/RoseGarden';
import { HiddenSurprise, BucketList } from './components/HiddenAndBucket';
import FinalSurprise from './components/FinalSurprise';
import PetalAnimation from './components/PetalAnimation';
import MusicController from './components/MusicController';
import { SecretHeart, Navigation } from './components/Navigation';
import { ClickHearts, ScrollToTop } from './components/ClickEffects';
import SparkleTrail from './components/SparkleTrail';
import { useAudio } from './hooks/useHooks';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    audio.initAudio();
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Start audio on user interaction (respects autoplay policy)
    audio.play();
    setTimeout(() => setShowContent(true), 500);
  };

  const handleReplay = () => {
    setShowContent(false);
    setTimeout(() => {
      setIntroComplete(false);
    }, 300);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream film-grain">
      {/* Intro Screen */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Persistent effects */}
            <PetalAnimation />
            <MusicController audioHook={audio} />
            <SecretHeart />
            <Navigation />
            <ClickHearts />
            <ScrollToTop />
            <SparkleTrail />

            {/* Sections */}
            <div id="hero">
              <Hero />
            </div>

            {/* Section divider */}
            <SectionDivider />

            <div id="story">
              <StoryTimeline />
            </div>

            <SectionDivider />

            <div id="memories">
              <MemoryGallery />
            </div>

            <SectionDivider />

            <div id="letter">
              <LoveLetter />
            </div>

            <SectionDivider />

            <div id="quiz">
              <LoveQuiz />
            </div>

            <SectionDivider />

            <div id="cake">
              <BirthdayCake />
            </div>

            <SectionDivider />

            <ReasonsILoveYou />

            <SectionDivider />

            <RoseGarden />

            <SectionDivider />

            <HiddenSurprise />

            <SectionDivider />

            <BucketList />

            <SectionDivider />

            <FinalSurprise onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative py-8 flex items-center justify-center">
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-soft/40 to-transparent" />
      <span className="mx-4 text-rose-soft/60 text-sm">✦</span>
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-soft/40 to-transparent" />
    </div>
  );
}

export default App;
