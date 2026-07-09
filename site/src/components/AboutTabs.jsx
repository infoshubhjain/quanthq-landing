import { useState, useEffect } from 'react';

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

const badgeColor = {
  'Open Source': 'text-[var(--green)]',
  'Private': 'text-[var(--text-3)]',
  'Research': 'text-[var(--accent)]',
  'Coming Soon': 'text-[var(--accent2)]',
  'Live': 'text-[var(--green)]',
  'Quarterly': 'text-[var(--accent)]',
  'Weekly': 'text-[var(--accent2)]',
  'Global': 'text-[var(--text-2)]',
  'Ongoing': 'text-[var(--text-2)]',
  'Hands-on': 'text-[var(--accent)]',
  'Structured': 'text-[var(--accent2)]',
  '1:1': 'text-[var(--green)]',
  'Applications open': 'text-[var(--accent)]',
};

export default function AboutTabs() {
  const [active, setActive] = useState('mission');
  const [visible, setVisible] = useState(true);
  const tab = TABS.find((t) => t.id === active);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (TABS.some((t) => t.id === hash)) setActive(hash);
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (TABS.some((t) => t.id === h)) setActive(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleTabClick = (id) => {
    if (id === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(id);
      history.replaceState(null, '', `#${id}`);
      requestAnimationFrame(() => setVisible(true));
    }, 150);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={t.id}
            onClick={() => handleTabClick(t.id)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
              active === t.id
                ? 'border-[var(--accent)] text-[var(--accent)] bg-accent-8'
                : 'border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--border-hover)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
      >
          <h2 className="text-[clamp(32px,5vw,64px)] font-extrabold tracking-[-0.03em] leading-[1.05] max-w-3xl">
            {tab.headline}
          </h2>
          <p className="mt-5 text-[var(--text-2)] max-w-xl leading-relaxed">{tab.body}</p>

          {tab.stats && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
              {tab.stats.map(([n, l]) => (
                <div key={l} className="bg-[var(--card-bg)] p-8">
                  <div className="text-4xl font-extrabold tracking-tight">{n}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.1em] text-[var(--text-3)] font-medium">{l}</div>
                </div>
              ))}
            </div>
          )}

          {tab.timeline && (
            <div className="mt-12 border-l border-[var(--border)] pl-8 space-y-10">
              {tab.timeline.map(([year, items]) => (
                <div key={year}>
                  <div className="text-2xl font-bold text-[var(--accent)]">{year}</div>
                  <ul className="mt-3 space-y-2">
                    {items.map((i) => (
                      <li key={i} className="text-[var(--text-1)] before:content-['├─'] before:text-[var(--text-4)] before:mr-3 font-mono text-sm">{i}</li>
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
                  <div className="font-semibold text-[var(--text-1)]">{title}</div>
                  <div className={`mt-2 text-[10px] uppercase tracking-[0.15em] ${badgeColor[badge] || 'text-[var(--accent)]'}`}>{badge}</div>
                </div>
              ))}
            </div>
          )}

          {tab.roadmap && (
            <div className="mt-12 flex flex-col items-start gap-1">
              <div className="text-sm text-[var(--text-3)] mb-3 font-mono">2026 →</div>
              {tab.roadmap.map((step, i) => (
                <div key={step} className="flex flex-col items-start">
                  <div className="card px-6 py-4 font-semibold text-[var(--text-1)]">{step}</div>
                  {i < tab.roadmap.length - 1 && <div className="text-[var(--text-4)] pl-8 py-1">↓</div>}
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}
