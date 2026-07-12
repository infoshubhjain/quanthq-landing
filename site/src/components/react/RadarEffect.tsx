import { motion, useReducedMotion } from 'framer-motion';

interface Agent {
  name: string;
  status: 'running' | 'training' | 'idle';
  angle: number;
  icon: string;
}

const AGENTS: Agent[] = [
  { name: 'alpha-extractor-v3', status: 'running', angle: 0, icon: 'α' },
  { name: 'regime-classifier', status: 'training', angle: 72, icon: 'R' },
  { name: 'earnings-nlp', status: 'running', angle: 144, icon: 'E' },
  { name: 'signal-ranker', status: 'running', angle: 216, icon: 'S' },
  { name: 'backtest-engine', status: 'idle', angle: 288, icon: 'B' },
];

const STATUS_COLOR = {
  running: 'var(--green)',
  training: 'var(--blue)',
  idle: 'var(--text-4)',
};

// Pre-compute positions to avoid SSR/client hydration float mismatch
const POSITIONS = AGENTS.map((a) => {
  const rad = (a.angle * Math.PI) / 180;
  const r = 42;
  return {
    x: `${(50 + Math.cos(rad) * r).toFixed(4)}%`,
    y: `${(50 + Math.sin(rad) * r).toFixed(4)}%`,
  };
});

export default function RadarEffect() {
  const reduced = useReducedMotion();

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: 280, margin: '0 auto' }}>
      {/* Radar rings */}
      {[1, 0.72, 0.44].map((scale, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: `${(1 - scale) * 50}%`,
            border: '1px solid var(--border)',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Rotating sweep */}
      {!reduced && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(61,123,255,0.12) 30deg, transparent 60deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 12px rgba(0,255,136,0.5)',
        }}
      />

      {/* Agent dots */}
      {AGENTS.map((agent, i) => (
          <div
            key={agent.name}
            style={{
              position: 'absolute',
              left: POSITIONS[i].x,
              top: POSITIONS[i].y,
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: `2px solid ${STATUS_COLOR[agent.status]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: STATUS_COLOR[agent.status],
                background: 'var(--carbon)',
                position: 'relative',
              }}
            >
              {agent.icon}
              {agent.status === 'running' && (
                <span
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: `1px solid ${STATUS_COLOR[agent.status]}`,
                    opacity: 0.3,
                    animation: 'radarPulse 2s ease-out infinite',
                  }}
                />
              )}
            </div>
            <div style={{ fontSize: 8, color: 'var(--text-3)', marginTop: 4, letterSpacing: '0.06em', whiteSpace: 'nowrap', fontFamily: "'Courier New',monospace" }}>
              {agent.status === 'training' ? '● TRAINING' : agent.status === 'running' ? '● LIVE' : '○ IDLE'}
            </div>
          </div>
      ))}
    </div>
  );
}
