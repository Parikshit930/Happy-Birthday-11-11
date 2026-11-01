import { useState, useRef, useCallback, useEffect } from 'react';

// ── AUDIO HOOK ──
// Singleton audio element reference to guarantee unbroken playback and sync
let globalAudioElement: HTMLAudioElement | null = null;
let userExplicitlyPaused = false;

function getOrCreateAudio(): HTMLAudioElement {
  if (!globalAudioElement) {
    // Check if an audio element already exists in the DOM
    let el = document.getElementById('birthday-bg-music') as HTMLAudioElement | null;
    if (!el) {
      el = document.createElement('audio');
      el.id = 'birthday-bg-music';
      el.src = '/audio/music.mp3';
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0.8;
      // Append to body so the browser keeps it alive
      document.body.appendChild(el);
    }
    globalAudioElement = el;
  }
  return globalAudioElement;
}

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = getOrCreateAudio();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => console.error('Audio playback error:', e);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('playing', onPlay);
    audio.addEventListener('error', onError);

    // Initial state sync
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);
    setVolume(audio.volume);

    // Global click listener to auto-start on ANY user interaction if not playing and not paused by user
    const handleUserInteraction = () => {
      if (!userExplicitlyPaused && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Will succeed on subsequent click
        });
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('playing', onPlay);
      audio.removeEventListener('error', onError);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const initAudio = useCallback(() => {
    getOrCreateAudio();
  }, []);

  const play = useCallback(() => {
    userExplicitlyPaused = false;
    const audio = getOrCreateAudio();
    audio.muted = false;
    audio.volume = volume > 0 ? volume : 0.8;
    setIsMuted(false);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play request waiting for user gesture:', err);
          setIsPlaying(false);
        });
    }
  }, [volume]);

  const pause = useCallback(() => {
    userExplicitlyPaused = true;
    const audio = getOrCreateAudio();
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = getOrCreateAudio();
    if (!audio.paused) {
      pause();
    } else {
      play();
    }
  }, [play, pause]);

  const toggleMute = useCallback(() => {
    const audio = getOrCreateAudio();
    const nextMute = !audio.muted;
    audio.muted = nextMute;
    setIsMuted(nextMute);
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    const audio = getOrCreateAudio();
    audio.volume = v;
    if (v > 0 && audio.muted) {
      audio.muted = false;
      setIsMuted(false);
    }
  }, []);

  return { initAudio, play, pause, togglePlay, toggleMute, changeVolume, isPlaying, isMuted, volume };
}

// ── REDUCED MOTION HOOK ──
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// ── LOCAL STORAGE HOOK ──
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// ── INTERSECTION OBSERVER HOOK ──
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}
