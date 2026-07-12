import { motion, useReducedMotion } from 'framer-motion';

/* HUD-style status badges (21st.dev hud-status) for the research-agent feed. */
type Status = 'running' | 'training' | 'idle';

const AGENTS: { name: string; status: Status }[] = [
  { name: 'alpha-extractor-v3', status: 'running' },
  { name: 'regime-classifier', status: 'training' },
  { name: 'earnings-nlp-agent', status: 'idle' },
  { name: 'backtest-engine-5d', status: 'running' },
  { name: 'signal-ranker', status: 'running' },
];

const COLOR: Record<Status, string> = {
  running: 'var(--green)',
  training: 'var(--violet)',
  idle: 'var(--text-4)',
};

function Badge({ status }: { status: Status }) {
  const reduced = useReducedMotion();
  const c = COLOR[status];
  const live = status !== 'idle' && !reduced;
  return (
    <span className="hud-badge" style={{ color: c, borderColor: `color-mix(in srgb, ${c} 35%, transparent)` }}>
      <motion.span
        className="hud-badge-dot"
        style={{ background: c }}
        animate={live ? { opacity: [1, 0.35, 1], boxShadow: [`0 0 6px ${c}`, `0 0 1px ${c}`, `0 0 6px ${c}`] } : undefined}
        transition={live ? { duration: status === 'training' ? 1.1 : 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {status}
    </span>
  );
}

export default function AgentFeed() {
  return (
    <>
      {AGENTS.map(a => (
        <div className="agent-row" key={a.name}>
          <span className="agent-name" style={{ fontFamily: "'Courier New',monospace" }}>{a.name}</span>
          <Badge status={a.status} />
        </div>
      ))}
    </>
  );
}
