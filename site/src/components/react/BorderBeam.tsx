import { type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function BorderBeam({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
      {!reduced && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            padding: 1,
            pointerEvents: 'none',
            background: 'conic-gradient(from var(--bb-angle, 0deg), transparent 0%, rgba(61,123,255,0.6) 8%, transparent 16%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            animation: 'bbSpin 4s linear infinite',
            zIndex: 1,
          }}
        />
      )}
      {children}
    </div>
  );
}
