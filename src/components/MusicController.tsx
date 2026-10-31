import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, X } from 'lucide-react';
import { useAudio } from '../hooks/useHooks';

interface MusicControllerProps {
  audioHook: ReturnType<typeof useAudio>;
}

export default function MusicController({ audioHook }: MusicControllerProps) {
  const { isPlaying, togglePlay, toggleMute, isMuted, changeVolume, volume } = audioHook;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute bottom-16 right-0 mb-2 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl min-w-[200px]"
            style={{ border: '1px solid rgba(244, 167, 193, 0.3)' }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-burgundy font-medium flex items-center gap-2">
                <Music size={14} />
                Music
              </span>
              <button onClick={() => setExpanded(false)} className="text-dusty-pink hover:text-burgundy">
                <X size={14} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-blush/50 flex items-center justify-center hover:bg-blush transition-colors"
              >
                {isPlaying ? (
                  <span className="text-burgundy text-sm">⏸</span>
                ) : (
                  <span className="text-burgundy text-sm">▶</span>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-blush/50 flex items-center justify-center hover:bg-blush transition-colors"
              >
                {isMuted ? (
                  <VolumeX size={16} className="text-burgundy" />
                ) : (
                  <Volume2 size={16} className="text-burgundy" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-dusty-pink">Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none bg-blush/30 accent-rose-soft"
              />
            </div>

            <p className="text-xs text-dusty-pink/60 mt-3 italic">
              Add your music file to enable playback
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #F4A7C1, #D98CA8)',
          boxShadow: '0 5px 20px rgba(244, 167, 193, 0.4)',
        }}
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying ? { boxShadow: ['0 5px 20px rgba(244,167,193,0.4)', '0 5px 30px rgba(244,167,193,0.6)', '0 5px 20px rgba(244,167,193,0.4)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isMuted || !isPlaying ? (
          <VolumeX size={20} className="text-white" />
        ) : (
          <Volume2 size={20} className="text-white" />
        )}
      </motion.button>
    </div>
  );
}
