import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Stage {
  label: string;
  x: number;
  y: number;
}

const STAGES: Stage[] = [
  { label: 'Ingestion', x: 0, y: 50 },
  { label: 'Attribution', x: 28, y: 50 },
  { label: 'Signal', x: 56, y: 50 },
  { label: 'Ranking', x: 84, y: 50 },
];

export default function AnimatedBeam() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    const beams = svg.querySelectorAll<SVGGeometryElement>('.ab-beam');
    const anims: Animation[] = [];

    beams.forEach((beam, i) => {
      const len = beam.getTotalLength();
      beam.style.strokeDasharray = `${len * 0.3} ${len * 0.7}`;
      beam.style.strokeDashoffset = `${len}`;

      const anim = beam.animate(
        [
          { strokeDashoffset: `${len}` },
          { strokeDashoffset: `${-len * 0.3}` },
        ],
        {
          duration: 2200 + i * 200,
          iterations: Infinity,
          easing: 'linear',
          delay: i * 600,
        }
      );
      anims.push(anim);
    });

    return () => anims.forEach((a) => a.cancel());
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      style={{ width: '100%', height: 60, overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Connection lines */}
      {STAGES.slice(0, -1).map((s, i) => {
        const next = STAGES[i + 1];
        return (
          <line
            key={`line-${i}`}
            x1={s.x + 10}
            y1={s.y}
            x2={next.x - 2}
            y2={next.y}
            stroke="var(--border-hover)"
            strokeWidth="0.4"
          />
        );
      })}

      {/* Beams */}
      {STAGES.slice(0, -1).map((s, i) => {
        const next = STAGES[i + 1];
        return (
          <line
            key={`beam-${i}`}
            className="ab-beam"
            x1={s.x + 10}
            y1={s.y}
            x2={next.x - 2}
            y2={next.y}
            stroke="var(--blue)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        );
      })}

      {/* Stage nodes */}
      {STAGES.map((s) => (
        <g key={s.label}>
          <circle cx={s.x + 5} cy={s.y} r="4" fill="var(--carbon)" stroke="var(--blue)" strokeWidth="0.6" />
          <circle cx={s.x + 5} cy={s.y} r="1.5" fill="var(--blue)" />
          <text
            x={s.x + 5}
            y={s.y + 12}
            textAnchor="middle"
            fill="var(--text-3)"
            fontSize="3.5"
            fontFamily="'Courier New',monospace"
            letterSpacing="0.08em"
          >
            {s.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
