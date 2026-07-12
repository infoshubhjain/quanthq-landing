import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/* Port of 21st.dev / magicui NumberTicker — springs from 0 to `value` on first view. */
export default function NumberTicker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 45, stiffness: 130 });
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    if (reduced) { if (ref.current) ref.current.textContent = value.toLocaleString('en-US'); return; }
    mv.set(value);
  }, [inView, value, reduced]);

  useEffect(() => spring.on('change', v => {
    if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US');
  }), [spring]);

  return <span ref={ref}>{reduced ? value.toLocaleString('en-US') : 0}</span>;
}
