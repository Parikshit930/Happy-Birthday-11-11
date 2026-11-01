import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useHooks';

export default function PetalAnimation() {
  const reducedMotion = useReducedMotion();

  const petals = useMemo(() => {
    if (reducedMotion) return [];
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 6 + 8,
      duration: Math.random() * 6 + 9,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.3 + 0.25,
      hue: i % 2 === 0 ? '#F8C8DC' : '#F4A7C1',
    }));
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden" style={{ contain: 'strict' }}>
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
            willChange: 'transform',
          }}
        >
          <div
            style={{
              width: petal.size,
              height: petal.size * 1.3,
              background: `linear-gradient(135deg, ${petal.hue}, ${petal.hue}dd)`,
              borderRadius: '50% 0 50% 50%',
              opacity: petal.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
}
