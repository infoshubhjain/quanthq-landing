# Comprehensive Audit & Improvement Skill

## Purpose
Performs exhaustive verification of all implemented work, finds and fixes bugs, then iteratively improves the codebase until everything is production-ready and optimized.

## When to Use
- After implementing a batch of features/changes
- Before deploying to production
- When you want a "final pass" that catches everything
- Periodic deep audits of the codebase

## Workflow

### Phase 1: Verification Audit (Does the implementation match the spec?)
1. **Read the original request** — understand exactly what was asked
2. **Read all modified files** — trace every change made
3. **Check each requirement** — tick off: implemented? working? tested?
4. **Run the build** — `npm run build` must pass with zero errors
5. **Run the dev server** — verify runtime behavior in browser
6. **Check console** — zero errors/warnings across full page scroll
7. **Verify each feature** — interactive test each component

### Phase 2: Bug Hunt (What's broken?)
1. **Hydration mismatches** — SSR vs client rendering differences
2. **Race conditions** — async timing, event listener leaks
3. **Memory leaks** — unremoved intervals, observers, event listeners
4. **Accessibility** — missing ARIA, keyboard nav, focus management
5. **Reduced motion** — every animation respects `prefers-reduced-motion`
6. **Mobile/responsive** — test at 375px, 768px, 1024px, 1440px
7. **Performance** — LCP, CLS, TBT, bundle size analysis
8. **Edge cases** — empty states, error states, slow network, missing data

### Phase 3: Code Quality (Is it clean?)
1. **Dead code** — unused imports, unreachable branches, commented blocks
2. **Duplication** — repeated logic → extract to shared util
3. **Magic numbers** — hardcoded values → CSS variables / constants
4. **Type safety** — strict TS, no `any`, proper generics
5. **Bundle impact** — tree-shaking, dynamic imports, code splitting
6. **Naming** — clear, consistent, follows project conventions

### Phase 4: Improvements (How to make it better?)
1. **Performance** — lazy load, debounce, virtualize, memoize
2. **UX** — loading states, error boundaries, micro-interactions
3. **DX** — better types, component APIs, documentation comments
4. **Architecture** — deep modules, clear boundaries, single responsibility
5. **Visual polish** — consistent spacing, color tokens, motion language

### Phase 5: Iterate Until Clean
Repeat Phases 1-4 until:
- Build passes ✓
- Zero console errors ✓
- All features verified working ✓
- No dead code ✓
- All animations respect reduced motion ✓
- Responsive at all breakpoints ✓
- Bundle size acceptable ✓
- No TODOs/FIXMEs without tickets ✓

## Commands
- `/audit-full` — Run complete verification + improvement cycle
- `/audit-verify` — Phase 1 only (verify implementation matches spec)
- `/audit-bugs` — Phase 2 only (find runtime bugs)
- `/audit-quality` — Phase 3 only (code quality scan)
- `/audit-improve` — Phase 4 only (suggest improvements)
- `/audit-loop` — Run full cycle repeatedly until clean (default)

## Output Format
Each cycle produces a report:
```
=== AUDIT CYCLE N ===
✓ VERIFIED: [feature] — working correctly
✗ BUG: [file:line] — [description] — FIXED / NEEDS WORK
⚠ QUALITY: [file:line] — [issue] — IMPROVED / DEFERRED
→ IMPROVEMENT: [file:line] — [suggestion] — APPLIED / NOTED

SUMMARY: X verified, Y bugs fixed, Z quality issues improved
STATUS: CLEAN / NEEDS ANOTHER CYCLE
```

## Heuristics
- **Trust but verify** — even "working" code may have hidden bugs
- **Test like a user** — not just "does it render" but "does it feel right"
- **Prefer deletion** — remove code over adding fixes
- **One thing at a time** — fix, verify, commit, next
- **Document decisions** — why this fix, not that one