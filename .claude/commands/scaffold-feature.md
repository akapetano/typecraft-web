---
description: Scaffold a feature's file structure per AGENTS.md
argument-hint: <FeatureName> [target dir, e.g. src/components/features]
---

Scaffold a new feature named **$1** following the "Adding a new feature" flow in
`AGENTS.md`. If a target directory is given as `$2`, create it there; otherwise
default to `src/components/features/$1/`.

Create only the files the feature actually needs — don't generate empty
boilerplate for the sake of it. Use `$1` (PascalCase) as the base name:

- `$1.types.ts` — shared types (or add to `src/types/` if global).
- `$1.data.ts` / `$1.constants.ts` — static data / constants (only if needed).
- `$1.hooks.ts` — state and handlers.
- `$1.utils.ts` — pure helpers.
- `$1.styles.ts` — component-specific `cva` variants (see panda-styling rule).
- `$1.tsx` — main component; subcomponents go in `$1/components/`.
- `$1.test.tsx` — co-located Vitest + Testing Library test; add vitest-axe when
  the component renders interactive or landmark content.

Rules to follow (do not restate them, apply them):

- `.cursor/rules/react-next-components.mdc` — component structure.
- `.cursor/rules/panda-styling.mdc` — Panda/`cva`, semantic tokens only.
- `.cursor/rules/testing.mdc` — Vitest/Testing Library conventions.
- `.cursor/rules/accessibility.mdc` — a11y expectations.
- `.cursor/rules/react-compiler-client.mdc` — add `"use client"` only when the
  module uses hooks or browser APIs.

Use the `@/` path alias for src imports. After scaffolding, summarize the files
created and note any follow-ups (e.g. wiring the component into a route/page).
