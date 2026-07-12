# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

All project guidance lives in @AGENTS.md — stack, commands, conventions, rules, and known tech debt. Keep that file as the single source of truth; update it there, not here.

Quick orientation (verified against the code):
- Astro 5 static site in `site/` — all npm commands run from `site/`, not the repo root.
- `npm run dev` / `npm run build` / `npm run preview`. No tests, no lint.
- The homepage `site/src/pages/index.astro` (~2700 lines) is intentionally standalone with its own layout/CSS/JS; every other page uses `site/src/layouts/Base.astro` + `site/src/styles/global.css`.
- Blog/research content is MDX under `site/src/content/`, schemas in `site/src/content.config.ts`.
- Interactive homepage widgets are React islands in `site/src/components/react/` (framer-motion); vanilla ↔ React talk via `quanthq:*` custom events. Everything else stays vanilla.
- Deploys to GitHub Pages (quanthq.in). Never touch `CNAME` or `.github/workflows/deploy.yml`.
