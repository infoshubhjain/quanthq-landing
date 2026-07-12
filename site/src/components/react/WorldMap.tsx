import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Port of the Aceternity WorldMap: a dotted-map silhouette with animated
   connection arcs between QuantHQ's office cities. The dotted silhouette is
   generated at build time (index.astro) and passed in as `darkMap`/`lightMap`
   data URIs, so `dotted-map`'s world dataset never ships to the browser. */

type City = { name: string; lat: number; lng: number };
const CITIES: City[] = [
  { name: 'New York', lat: 40.7, lng: -74.0 },
  { name: 'San Francisco', lat: 37.8, lng: -122.4 },
  { name: 'Chicago', lat: 41.9, lng: -87.6 },
  { name: 'São Paulo', lat: -23.5, lng: -46.6 },
  { name: 'London', lat: 51.5, lng: -0.1 },
  { name: 'Zurich', lat: 47.4, lng: 8.5 },
  { name: 'Dubai', lat: 25.2, lng: 55.3 },
  { name: 'Mumbai', lat: 19.1, lng: 72.9 },
  { name: 'Singapore', lat: 1.35, lng: 103.8 },
  { name: 'Hong Kong', lat: 22.3, lng: 114.2 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
];
const ARCS: [number, number][] = [
  [0, 4], [4, 5], [4, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [8, 11], [0, 3], [1, 0], [2, 0], [5, 10],
];

const W = 800, H = 400;
const project = (lat: number, lng: number) => ({
  x: (lng + 180) * (W / 360),
  y: (90 - lat) * (H / 180),
});
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - 60;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

function useLightTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setLight(el.classList.contains('light'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return light;
}

export default function WorldMap({ darkMap, lightMap }: { darkMap: string; lightMap: string }) {
  const reduced = useReducedMotion();
  const light = useLightTheme();

  const svgURI = light ? lightMap : darkMap;
  const line = light ? '#2563EB' : '#7AA2FF';
  const points = CITIES.map(c => project(c.lat, c.lng));

  return (
    <div className="worldmap">
      <img src={svgURI} className="worldmap-dots" alt="" draggable={false} aria-hidden="true" />
      <svg viewBox={`0 0 ${W} ${H}`} className="worldmap-svg" preserveAspectRatio="xMidYMid meet"
        role="img" aria-label="QuantHQ global research network — offices in twelve cities connected by live data routes">
        <defs>
          <linearGradient id="wm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={line} stopOpacity="0" />
            <stop offset="30%" stopColor={line} stopOpacity="1" />
            <stop offset="70%" stopColor={line} stopOpacity="1" />
            <stop offset="100%" stopColor={line} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ARCS.map(([a, b], i) => {
          const d = curve(points[a], points[b]);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={line} strokeOpacity="0.15" strokeWidth="1" />
              {!reduced && (
                <motion.path
                  d={d} fill="none" stroke="url(#wm-grad)" strokeWidth="1.4" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 1.6, delay: i * 0.18, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="2.4" fill={line} />
            {!reduced && (
              <motion.circle
                cx={p.x} cy={p.y} r="2.4" fill="none" stroke={line} strokeWidth="1"
                initial={{ r: 2.4, opacity: 0.6 }}
                animate={{ r: [2.4, 9], opacity: [0.6, 0] }}
                transition={{ duration: 2, delay: (i % 6) * 0.3, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
