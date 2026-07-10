---
description: Code review of recent changes
---
Review the recent changes in this project:

1. Run `git diff HEAD~1` to see the last commit's changes
2. Also run `git diff --stat HEAD~3` for broader context
3. Review for:
   - Correctness: does the code do what it claims?
   - Security: secrets exposed? Injection vectors?
   - Performance: unnecessary re-renders? Missing optimizations?
   - Accessibility: ARIA labels? Keyboard nav? Reduced motion?
   - Dead code: unused imports, unreachable branches
   - Consistency: matches existing patterns?
4. Check if AGENTS.md conventions were followed
5. Report findings as: **File:line** — issue — severity — fix
6. End with summary: X critical, Y warnings, Z info
