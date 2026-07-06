---
description: Pre-PR verification — Biome lint, Vitest, and production build
---

Run the pre-PR verification gate for this repo and report results.

Run these in order and capture output:

1. `pnpm lint` — Biome check.
2. `pnpm test:run` — Vitest single run.
3. `pnpm build` — Next.js production build.

Guidelines:

- Run all three even if an earlier step fails, so the report is complete.
- For each step report ✅ pass / ❌ fail, and for failures include the relevant
  error lines (not the full log).
- If `pnpm lint` fails on autofixable issues, suggest `pnpm fix`.
- End with a one-line verdict: ready for PR, or the list of steps to fix first.
- Do not commit, push, or open a PR — this command only verifies.
