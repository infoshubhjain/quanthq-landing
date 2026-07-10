---
description: Full site audit — build, check, screenshot, report
---
Run a full audit of the QuantHQ site:

1. Run `npm run build` from site/ directory — check for build errors
2. Run `npm run dev` in background, wait for server to start
3. Use Playwright MCP to screenshot these pages at desktop (1280x720):
   - http://localhost:4321/ (homepage)
   - http://localhost:4321/about/
   - http://localhost:4321/research/
   - http://localhost:4321/blog/
   - http://localhost:4321/community/
   - http://localhost:4321/contact/
4. Also screenshot mobile (375x667) of homepage
5. Check each screenshot for: layout breaks, missing images, contrast issues, text overflow
6. Check for broken links by fetching each route
7. Report findings as PASS/ISSUE/WARNING with file:line references
8. Kill the dev server when done
