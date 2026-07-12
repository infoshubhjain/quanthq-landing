import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* Detail dialog for the SPX / VIX dashboard cells. The page script exposes its
   simulated series on window.__quantData and dispatches `quanthq:market`. */
declare global {
  interface Window { __quantData?: { spx: number[]; vix: number[] }; }
}

type View = { sym: 'SPX' | 'VIX'; data: number[] } | null;

const fmt = (sym: string, v: number) =>
  sym === 'SPX' ? Math.round(v).toLocaleString('en-US') : v.toFixed(1);

export default function MarketModal() {
  const [view, setView] = useState<View>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onOpen = (e: Event) => {
      const sym = (e as CustomEvent<string>).detail as 'SPX' | 'VIX';
      const d = window.__quantData;
      if (!d) return;
      setView({ sym, data: [...(sym === 'SPX' ? d.spx : d.vix)] });
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setView(null); };
    addEventListener('quanthq:market', onOpen);
    addEventListener('keydown', onKey);
    return () => { removeEventListener('quanthq:market', onOpen); removeEventListener('keydown', onKey); };
  }, []);

  const W = 560, H = 200;
  let body = null;
  if (view) {
    const { sym, data } = view;
    const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 16) - 8}`);
    const last = data[data.length - 1];
    const chg = ((last / data[0] - 1) * 100);
    const up = chg >= 0;
    const stroke = sym === 'SPX' ? 'var(--blue)' : 'var(--red)';
    body = (
      <>
        <div className="mm-head">
          <div>
            <div className="mm-sym">{sym}</div>
            <div className="mm-sub">{sym === 'SPX' ? 'S&P 500 Index · simulated session' : 'CBOE Volatility Index · simulated session'}</div>
          </div>
          <button className="mm-close" aria-label="Close" onClick={() => setView(null)}>✕</button>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mm-chart" preserveAspectRatio="none" role="img"
          aria-label={`${sym} intraday chart, last ${fmt(sym, last)}`}>
          <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill={stroke} opacity="0.08" />
          <polyline points={pts.join(' ')} fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
        <div className="mm-stats">
          <div><span className="mm-k">Last</span><span className="mm-v">{fmt(sym, last)}</span></div>
          <div><span className="mm-k">Change</span><span className="mm-v" style={{ color: up ? 'var(--green)' : 'var(--red)' }}>{(up ? '+' : '') + chg.toFixed(2)}%</span></div>
          <div><span className="mm-k">High</span><span className="mm-v">{fmt(sym, max)}</span></div>
          <div><span className="mm-k">Low</span><span className="mm-v">{fmt(sym, min)}</span></div>
        </div>
        <div className="mm-note">Simulated data for demonstration — not live market prices.</div>
      </>
    );
  }

  return (
    <AnimatePresence>
      {view && (
        <motion.div
          className="cp-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
          onMouseDown={e => { if (e.target === e.currentTarget) setView(null); }}
        >
          <motion.div
            className="mm-panel" role="dialog" aria-modal="true" aria-label={`${view.sym} details`}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {body}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
