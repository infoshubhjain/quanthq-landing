---
description: Auto-optimize the codebase — dead code, bloat, ignore rules
---
Run an auto-optimization pass on this project:

1. **Dead code scan:**
   - Search for unused imports in all .astro and .ts files
   - Find commented-out code blocks (>5 lines)
   - Identify unreachable code paths
   - Check for unused CSS classes in global.css and index.astro

2. **Bloat detection:**
   - Flag files over 500 lines
   - Find duplicate code patterns (same 3+ lines appearing 3+ times)
   - Check for unused dependencies in package.json

3. **Update .opencodeignore:**
   - Add any new generated files (dist/, .astro/, etc.)
   - Add lock files if not needed in context
   - Add large static assets
   - Remove entries for files that no longer exist

4. **Report:**
   - List what was found with file:line references
   - Suggest specific fixes
   - Do NOT auto-fix anything — report only
