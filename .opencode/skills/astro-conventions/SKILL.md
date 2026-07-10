---
name: astro-conventions
description: Use when writing or editing Astro components, pages, or styles in this project. Enforces project conventions for Astro files, CSS variables, layout usage, and component patterns. Triggers on any task involving .astro files, global.css, Base.astro, or page creation.
mode: subagent
permission:
  edit: deny
---

# Astro Conventions Skill

Enforce consistent patterns when working with this Astro project.

## Layout Rules
- Inner pages (about, community, contact, blog, research) MUST use `Base.astro` layout
- Homepage (`index.astro`) is STANDALONE — does NOT use Base.astro. It has its own nav, footer, and CSS
- To use Base.astro: `import Base from '../layouts/Base.astro';` then wrap content in `<Base title="...">`

## CSS Variable System
Use variables from `global.css`, NOT hardcoded values:
- `--bg` (not `--black` or `#04060B`)
- `--card-bg` (not `--carbon` or `#090D15`)
- `--accent` (not `--blue` or `#3D7BFF`)
- `--accent2` (not `--violet` or `#7B5CFF`)
- `--text`, `--text-1`, `--text-2`, `--text-3`, `--text-4`
- `--border`, `--border-hover`
- `--green`, `--red`, `--cyan`

Homepage aliases (`--black`, `--carbon`, `--blue`, `--violet`, `--white`) exist in global.css `:root` block for backwards compat but prefer the canonical names.

## Component Patterns
- Components go in `src/components/`
- Currently only `AboutTabs.astro` exists as a reusable component
- Pages are in `src/pages/` — filename = route
- Dynamic routes use `[...slug].astro` pattern
- Content collections defined in `src/content.config.ts`

## MDX Content
- Blog posts in `src/content/blog/*.mdx`
- Research papers in `src/content/research/*.mdx`
- Frontmatter schema defined in `src/content.config.ts`
- Use `prose-dark` class for MDX body styling

## Animation Rules
- Always respect `prefers-reduced-motion: reduce`
- Use CSS keyframes over JS animation libraries
- IntersectionObserver for scroll-triggered animations
- Canvas code is decorative only — never functional

## Tailwind Usage
- Tailwind v4.1 via Vite plugin (NOT @tailwindcss/cli)
- Use `@import "tailwindcss"` in CSS files
- Custom utilities defined in global.css (`.bg-accent-8`, `.bg-ink-85`, etc.)
- Arbitrary values: `text-[var(--text-2)]`, `bg-[var(--card-bg)]`

## Common Gotchas
- `index.astro` has its own `<style>` block (1246 lines) — don't try to merge with global.css
- Ticker tape data is duplicated in Base.astro and index.astro — this is known tech debt
- The homepage footer links to `/projects/` which doesn't exist — this is a known bug
- OG image meta tag is missing from all pages
