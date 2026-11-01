import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import Hero from './components/Hero';
import StoryTimeline from './components/StoryTimeline';
import MemoryGallery from './components/MemoryGallery';
import LoveLetter from './components/LoveLetter';
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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    audio.initAudio();
  }, [audio]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Start audio immediately upon unlocking
    audio.play();
    setShowContent(true);
  };

  const handleReplay = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsUnlocked(false);
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cream film-grain flex flex-col items-center justify-start">
      {/* Background audio element anchored directly in DOM */}
      <audio id="birthday-bg-music" src="/audio/music.mp3" loop preload="auto" playsInline />

      {/* Floating music controller is ALWAYS available across the entire journey */}
      <MusicController audioHook={audio} />

      {/* Lock Screen with Passcode 1111 */}
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen onUnlock={handleUnlock} onStartMusic={() => audio.play()} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="w-full flex flex-col items-center justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Persistent background effects */}
            <PetalAnimation />
            <SecretHeart />
            <Navigation />
            <ClickHearts />
            <ScrollToTop />
            <SparkleTrail />

            {/* Sections — Full width backgrounds with centered content */}
            <div id="hero" className="w-full">
              <Hero />
            </div>

            <SectionDivider />

            <div id="story" className="w-full">
              <StoryTimeline />
            </div>

            <SectionDivider />

            <div id="memories" className="w-full">
              <MemoryGallery />
            </div>

            <SectionDivider />

            <div id="letter" className="w-full">
              <LoveLetter />
            </div>

            <SectionDivider />

            <div id="cake" className="w-full">
              <BirthdayCake />
            </div>

            <SectionDivider />

            <div id="reasons" className="w-full">
              <ReasonsILoveYou />
            </div>

            <SectionDivider />

            <div id="garden" className="w-full">
              <RoseGarden />
            </div>

            <SectionDivider />

            <div id="surprise" className="w-full">
              <HiddenSurprise />
            </div>

            <SectionDivider />

            <div id="bucketlist" className="w-full">
              <BucketList />
            </div>

            <SectionDivider />

            <div id="final" className="w-full">
              <FinalSurprise onReplay={handleReplay} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative py-6 flex items-center justify-center w-full">
      <div className="w-36 sm:w-56 md:w-72 h-px bg-gradient-to-r from-transparent via-rose-soft/40 to-transparent" />
      <span className="mx-4 text-rose-soft/70 text-sm">✦</span>
      <div className="w-36 sm:w-56 md:w-72 h-px bg-gradient-to-r from-transparent via-rose-soft/40 to-transparent" />
    </div>
  );
}

export default App;
