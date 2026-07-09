import { useState } from 'react';
import { motion } from 'framer-motion';

const TABS = [
  {
    id: 'mission', label: 'Mission',
    headline: 'Building practical AI systems through open research.',
    body: 'QuantHQ exists to make rigorous quantitative research open, collaborative, and reproducible.',
    stats: [
      ['18', 'Research Papers'],
      ['4', 'Open Source Projects'],
      ['200+', 'Community Members'],
      ['3', 'Universities'],
    ],
  },
  {
    id: 'research', label: 'Research',
    headline: 'A timeline of what we study.',
    body: 'Our research agenda evolves with the frontier.',
    timeline: [
      ['2026', ['LLM Evaluation', 'Financial AI', 'Agent Systems']],
      ['2027', ['Multimodal Market Models', 'Autonomous Research Agents']],
    ],
  },
  {
    id: 'build', label: 'Build',
    headline: 'Research that ships.',
    body: 'Everything we learn becomes something you can run.',
    cards: [
      ['Agent Framework', 'Open Source'],
      ['Trading Infrastructure', 'Private'],
      ['Vision Models', 'Research'],
      ['Cybersecurity', 'Coming Soon'],
    ],
  },
  {
    id: 'community', label: 'Community',
    headline: 'Intelligence is a team sport.',
    body: 'Where the network lives.',
    cards: [
      ['Discord', 'Live'],
      ['Hackathons', 'Quarterly'],
      ['Reading Groups', 'Weekly'],
      ['Open Source Contributors', 'Global'],
      ['Collaborations', 'Ongoing'],
    ],
  },
  {
    id: 'education', label: 'Education',
    headline: 'Learn by doing research.',
    body: 'Workshops, courses, mentorship, and summer research programs for the next generation of quants.',
    cards: [
      ['Workshops', 'Hands-on'],
      ['Courses', 'Structured'],
      ['Mentorship', '1:1'],
      ['Summer Research', 'Applications open'],
    ],
  },
  {
    id: 'future', label: 'Future',
    headline: 'The roadmap.',
    body: 'Where QuantHQ is headed.',
    roadmap: ['Research Lab', 'Open Source Models', 'Student Fellowships', 'Conference'],
  },
];

export default function AboutTabs() {
  const [active, setActive] = useState('mission');
  const tab = TABS.find((t) => t.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
              active === t.id
                ? 'border-[#FFFFFF] text-[#FFFFFF] bg-[#FFFFFF]/8'
                : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/25'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[clamp(32px,5vw,64px)] font-extrabold tracking-[-0.03em] leading-[1.05] max-w-3xl">
            {tab.headline}
          </h2>
          <p className="mt-5 text-white/45 max-w-xl leading-relaxed">{tab.body}</p>

          {tab.stats && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
              {tab.stats.map(([n, l]) => (
                <div key={l} className="bg-[#090D15] p-8">
                  <div className="text-4xl font-extrabold tracking-tight">{n}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.1em] text-white/30 font-medium">{l}</div>
                </div>
              ))}
            </div>
          )}

          {tab.timeline && (
            <div className="mt-12 border-l border-white/10 pl-8 space-y-10">
              {tab.timeline.map(([year, items]) => (
                <div key={year}>
                  <div className="text-2xl font-bold text-[#FFFFFF]">{year}</div>
                  <ul className="mt-3 space-y-2">
                    {items.map((i) => (
                      <li key={i} className="text-white/60 before:content-['├─'] before:text-white/20 before:mr-3 font-mono text-sm">{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab.cards && (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tab.cards.map(([title, badge]) => (
                <div key={title} className="card p-6">
                  <div className="font-semibold text-white/85">{title}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#FFFFFF]">{badge}</div>
                </div>
              ))}
            </div>
          )}

          {tab.roadmap && (
            <div className="mt-12 flex flex-col items-start gap-1">
              <div className="text-sm text-white/30 mb-3 font-mono">2026 →</div>
              {tab.roadmap.map((step, i) => (
                <div key={step} className="flex flex-col items-start">
                  <div className="card px-6 py-4 font-semibold text-white/85">{step}</div>
                  {i < tab.roadmap.length - 1 && <div className="text-white/25 pl-8 py-1">↓</div>}
                </div>
              ))}
            </div>
          )}
        </motion.div>
    </div>
  );
}
