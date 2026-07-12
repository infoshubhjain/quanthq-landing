import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Item = { label: string; group: string; hint?: string; run: () => void };

const go = (href: string) => { location.href = href; };
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const ITEMS: Item[] = [
  { group: 'Pages', label: 'Research', hint: 'R', run: () => go('/research/') },
  { group: 'Pages', label: 'Blog', hint: 'B', run: () => go('/blog/') },
  { group: 'Pages', label: 'About', hint: 'A', run: () => go('/about/') },
  { group: 'Pages', label: 'Community', run: () => go('/community/') },
  { group: 'Pages', label: 'Contact', run: () => go('/contact/') },
  { group: 'Sections', label: 'Intelligence Layer', run: () => scrollTo('dashboard') },
  { group: 'Sections', label: 'Research Ecosystem', run: () => scrollTo('research') },
  { group: 'Sections', label: 'Active Projects', run: () => scrollTo('projects') },
  { group: 'Sections', label: 'Global Network', run: () => scrollTo('network') },
  { group: 'Sections', label: 'Terminal', run: () => scrollTo('terminal') },
  { group: 'Actions', label: 'Open signal feed', run: () => scrollTo('dashboard') },
  {
    group: 'Actions', label: 'Run backtest', run: () => {
      scrollTo('terminal');
      window.dispatchEvent(new CustomEvent('quanthq:term', { detail: 'backtest' }));
    },
  },
  { group: 'Actions', label: 'Toggle light / dark theme', run: () => document.getElementById('theme-toggle')?.click() },
  { group: 'Actions', label: 'Join QuantHQ', run: () => scrollTo('join') },
];

function isTyping() {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable || el.id === 'terminal-body');
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ITEMS.filter(i => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)) : ITEMS;
  }, [query]);

  useEffect(() => { setSel(0); }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (open || isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); setOpen(true); return; }
      const nav: Record<string, string> = { r: '/research/', b: '/blog/', a: '/about/' };
      if (nav[e.key.toLowerCase()]) go(nav[e.key.toLowerCase()]);
    };
    const onOpen = () => setOpen(true);
    addEventListener('keydown', onKey);
    addEventListener('quanthq:palette', onOpen);
    return () => { removeEventListener('keydown', onKey); removeEventListener('quanthq:palette', onOpen); };
  }, [open]);

  useEffect(() => {
    if (open) { setQuery(''); requestAnimationFrame(() => inputRef.current?.focus()); }
  }, [open]);

  const pick = (item: Item) => { setOpen(false); item.run(); };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter' && results[sel]) pick(results[sel]);
  };

  let lastGroup = '';
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cp-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
          onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <motion.div
            className="cp-panel" role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <input
              ref={inputRef} className="cp-input" placeholder="Search pages, sections, actions…"
              value={query} onChange={e => setQuery(e.target.value)} onKeyDown={onInputKey}
              aria-label="Search commands" spellCheck={false}
            />
            <div className="cp-list" role="listbox">
              {results.length === 0 && <div className="cp-empty">No matches — try “research” or “backtest”</div>}
              {results.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <div key={item.group + item.label}>
                    {header && <div className="cp-group">{header}</div>}
                    <button
                      className={'cp-item' + (i === sel ? ' active' : '')}
                      role="option" aria-selected={i === sel}
                      onMouseEnter={() => setSel(i)} onClick={() => pick(item)}
                    >
                      <span>{item.label}</span>
                      {item.hint && <kbd className="cp-kbd">{item.hint}</kbd>}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="cp-foot">
              <span><kbd className="cp-kbd">↑↓</kbd> navigate</span>
              <span><kbd className="cp-kbd">↵</kbd> select</span>
              <span><kbd className="cp-kbd">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
