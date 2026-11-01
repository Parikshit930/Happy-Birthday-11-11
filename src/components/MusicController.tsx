import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { useAudio } from '../hooks/useHooks';

interface MusicControllerProps {
  audioHook: ReturnType<typeof useAudio>;
}

export default function MusicController({ audioHook }: MusicControllerProps) {
  const { isPlaying, togglePlay, toggleMute, isMuted, changeVolume, volume } = audioHook;
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-2 select-none">
      {/* Volume Slider popup */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-blush/40"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
          >
            <button
              onClick={toggleMute}
              className="text-burgundy hover:text-dusty-pink transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-24 h-2 rounded-full appearance-none bg-blush/50 accent-burgundy cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volume Settings Toggle */}
      <motion.button
        className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-burgundy hover:bg-blush/30 border border-blush/40 transition-all cursor-pointer"
        onClick={() => setShowVolume(!showVolume)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Volume control"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>

      {/* Main Play/Pause Button */}
      <motion.button
        className="flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl text-white font-medium transition-all cursor-pointer border border-white/30"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, #7D294A, #A33B63)'
            : 'linear-gradient(135deg, #F4A7C1, #7D294A)',
          boxShadow: isPlaying
            ? '0 10px 30px rgba(125, 41, 74, 0.45)'
            : '0 10px 35px rgba(244, 167, 193, 0.6)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isPlaying ? { scale: [1, 1.05, 1] } : {}}
        transition={!isPlaying ? { duration: 1.8, repeat: Infinity } : {}}
      >
        {isPlaying ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            <Music size={17} className="text-white animate-bounce" />
            <span className="text-xs sm:text-sm tracking-wide font-semibold">Playing Our Song ♡</span>
            <span className="text-xs bg-white/25 px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
              <Pause size={12} fill="currentColor" /> Pause
            </span>
          </>
        ) : (
          <>
            <Music size={17} className="text-white animate-pulse" />
            <span className="text-xs sm:text-sm tracking-wide font-semibold">Play Our Song ♡</span>
            <span className="text-xs bg-white/25 px-2.5 py-1 rounded-full flex items-center gap-1 font-sans font-bold">
              <Play size={12} fill="currentColor" /> Play
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
