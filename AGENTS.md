# Project: QuantHQ Landing Site

## Stack
- Astro 5.10 (SSG) — static site generation
- Tailwind CSS 4.1 via Vite plugin
- MDX via @astrojs/mdx for blog posts and research papers
- No React/Vue/Svelte — pure Astro components with vanilla `<script>` tags
- Deployed to GitHub Pages at https://quanthq.in

## Directory Structure
```
site/
├── astro.config.mjs
├── package.json
├── public/logo.jpeg
└── src/
    ├── components/AboutTabs.astro
    ├── content/blog/ (2 MDX posts)
    ├── content/research/ (3 MDX papers)
    ├── content.config.ts
    ├── layouts/Base.astro (shared layout)
    ├── pages/index.astro (homepage, standalone 2508 lines)
    ├── pages/about.astro
    ├── pages/community.astro
    ├── pages/contact.astro
    ├── pages/blog/index.astro + [...slug].astro
    └── pages/research/index.astro + [...slug].astro
```

## Commands
- `npm run dev` — starts dev server (run from site/ directory)
- `npm run build` — builds for production
- `npm run preview` — preview production build

## Conventions
- Components are `.astro` files in `src/components/`
- Shared layout is `src/layouts/Base.astro` (imports `global.css`)
- Homepage (`index.astro`) is standalone — does NOT use Base.astro layout
- CSS variables defined in `src/styles/global.css` and duplicated in index.astro
- Theme: dark by default, light mode via `html.light` class + localStorage
- Animations: CSS keyframes + vanilla JS (IntersectionObserver, canvas)
- Font: Inter from Google Fonts

## Key Files
- `src/styles/global.css` — shared styles, theme variables, background FX
- `src/layouts/Base.astro` — nav, footer, ticker tape, background FX for inner pages
- `src/pages/index.astro` — homepage (standalone, 2508 lines, own CSS + JS)
- `FURTHER_WORK.md` — known tech debt and backlog
- `CNAME` — custom domain (quanthq.in)

## Rules
- Never modify CNAME or .github/workflows/deploy.yml
- Homepage nav has different links (Research, Blog, About, Intelligence, Network, Terminal) vs inner pages (Research, Blogs, Community, Contact)
- Keep index.astro standalone — it intentionally has its own layout
- Ticker data is hardcoded (simulated, not real API)
- All canvas code (globe, force graph) is decorative only
- `prefers-reduced-motion` must be respected — disable animations when set

## Known Tech Debt (from FURTHER_WORK.md)
- index.astro duplicates ~1275 lines of CSS from global.css with different variable names
- Duplicate ticker data in Base.astro and index.astro JS
- ~276 lines of decorative canvas code (globe + force graph)
- Word-by-word heading reveal could be simplified
- Terminal typing animation could be static with CSS

## Auto-Optimize Rules
You are an optimizing agent. At the start of every session and before every commit, proactively:

1. **Scan for dead code** — unused imports, unreachable branches, commented-out blocks, unused CSS classes/functions
2. **Maintain .opencodeignore** — if you create generated files (dist/, .astro/, logs), add them. If stale entries exist, remove them
3. **Flag bloat** — files over 500 lines, duplicate patterns, unused dependencies
4. **Token efficiency** — if a file adds context but no value, suggest adding it to .opencodeignore
5. **Quick wins** — hardcoded values → CSS vars, repeated code → extraction, missing a11y

Report findings immediately. Fix only after user confirms, unless it's a trivial safe fix (unused import, stale ignore entry).
