# Project: QuantHQ Landing Site

## Stack
- Astro 5.10 (SSG) — static site generation
- Tailwind CSS 4.1 via Vite plugin
- MDX via @astrojs/mdx for blog posts and research papers
- React islands (@astrojs/react + framer-motion) for interactive homepage widgets in `src/components/react/` (command palette, market modal, agent feed, number ticker); everything else is pure Astro with vanilla `<script>` tags
- Deployed to GitHub Pages at https://quanthq.in

## Directory Structure
```
site/
├── astro.config.mjs
├── package.json
├── public/logo.jpeg
└── src/
    ├── components/AboutTabs.astro
    ├── components/react/ (React islands: CommandPalette, MarketModal, AgentFeed, NumberTicker, WorldMap)
    ├── content/blog/ (MDX posts)
    ├── content/research/ (MDX papers)
    ├── content.config.ts
    ├── layouts/Base.astro (shared layout)
    ├── pages/index.astro (homepage, standalone ~2700 lines)
    ├── pages/about.astro
    ├── pages/community.astro
    ├── pages/contact.astro
    ├── pages/blog/index.astro + [...slug].astro
    └── pages/research/index.astro + [...slug].astro
```

## Commands
All commands run from `site/` directory.
- `npm run dev` — starts dev server (localhost:4321)
- `npm run build` — builds for production (output to `site/dist/`)
- `npm run preview` — preview production build
- No test suite exists. No lint/typecheck commands configured.

## Opencode Commands
- `/audit` — full site audit: build, screenshot pages, check for breaks
- `/deploy` — build + commit + push + verify deployment
- `/optimize` — scan dead code, bloat, stale ignore rules
- `/review` — code review of recent changes

## Conventions
- Components are `.astro` files in `src/components/`
- Shared layout is `src/layouts/Base.astro` (imports `global.css`)
- Homepage (`index.astro`) is standalone — does NOT use Base.astro layout
- CSS variables defined in `src/styles/global.css` and duplicated in index.astro
- Theme: dark by default, light mode via `html.light` class + localStorage
- Animations: CSS keyframes + vanilla JS (IntersectionObserver, canvas)
- Font: Inter from Google Fonts
- Content schemas in `src/content.config.ts` (research + blog collections)

## Key Files
- `src/styles/global.css` — shared styles, theme variables, background FX
- `src/layouts/Base.astro` — nav, footer, ticker tape, background FX for inner pages
- `src/pages/index.astro` — homepage (standalone, ~2700 lines, own CSS + JS)
- `FURTHER_WORK.md` — known tech debt and backlog
- `CNAME` — custom domain (quanthq.in)

## Rules
- Never modify CNAME or .github/workflows/deploy.yml
- Homepage nav has different links (Research, Blog, About, Intelligence, Network, Terminal) vs inner pages (Research, Blogs, Community, Contact)
- Keep index.astro standalone — it intentionally has its own layout
- Ticker data is hardcoded (simulated, not real API)
- React is for homepage island widgets only — don't convert whole pages to React; new interactivity defaults to vanilla JS unless it needs real state
- Custom events wire vanilla ↔ React: `quanthq:palette` (open palette), `quanthq:market` (SPX/VIX modal, series on `window.__quantData`), `quanthq:term` (run terminal command)
- Global Network map is the WorldMap React island (Aceternity dotted-map + animated arcs); dotted silhouette is generated at build time in index.astro frontmatter so `dotted-map` never ships to the client
- Remaining canvas code (force graph only) is decorative
- `prefers-reduced-motion` must be respected — disable animations when set
- CI copies `CNAME` into `dist/` after build — don't remove that step
- If you have any clarifying questions, ask them all upfront before starting work
