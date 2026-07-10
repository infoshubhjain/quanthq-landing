# Further Work

## From ponytail audit — not yet done

### index.astro CSS dedup (~1275 lines)
- `index.astro` is a standalone 2510-line HTML file that duplicates `global.css` with different variable names (`--black`/`--carbon`/`--blue` vs `--bg`/`--card-bg`/`--accent`)
- Add aliases to `global.css` (done), but `index.astro` still has its own full copy of base styles (reset, variables, typography, scrollbar, selection, focus)
- Rewrite to use `Base.astro` layout would remove ~1275 lines of CSS + ~200 lines of duplicate nav/footer HTML
- Blocker: homepage has different nav links (Intelligence, Network, Terminal) and different footer than other pages — needs a `nav` prop or slot-based layout override

### index.astro remaining cleanup
- Duplicate ticker data in `Base.astro:4-13` and `index.astro` JS — extract to shared config
- `aboutTabs` array in `Base.astro:21` only used by dropdown nav — inline the strings
- Word-by-word heading reveal (22 lines of DOM splits for blur-in effect) — could animate whole heading instead
- Terminal typing animation (32 lines for fake terminal replay) — could be static `<pre>` with CSS animation
- Globe + force graph canvas code (276 lines) — impressive but decorative-only, zero functionality

### Global
- `badgeColor` lookup in AboutTabs has 15 keys mapping to 4 unique outputs — function with switch covers it
- Research page `searchIndex` serialization (builds index in frontmatter, serializes via `define:vars`, then imports Fuse from CDN) — could read from DOM
- Blog page hardcoded categories duplicated from `content.config.ts` — extract at build time
- `root .gitignore` has 6 stale entries for nonexistent directories — cleaned up but verify
