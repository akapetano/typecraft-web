# Agent guide – Typecraft Web

High-level guide for AI agents. Detailed conventions live in **`.cursor/rules/`**; this file points to them and outlines common flows.

## Stack and structure

- **Stack**: Next.js 16 (App Router), React 19, Panda CSS, Ark UI, Biome, Vitest. Path alias: `@/*` → `./src/*`.
- **Rules**: See `.cursor/rules/project-overview.mdc` for commands, folders, and tooling.

## Adding a new feature

1. **Types** – Add shared types in `FeatureName.types.ts` next to the feature (or in `src/types/` if global).
2. **Data/constants** – Use `FeatureName.data.ts` and `FeatureName.constants.ts` for static data and constants.
3. **Logic** – Put state and handlers in `FeatureName.hooks.ts`; pure helpers in `FeatureName.utils.ts`.
4. **UI** – Main component in `FeatureName.tsx`; subcomponents in `FeatureName/components/`. Use Ark UI + Panda; add `"use client"` only if the module uses hooks or browser APIs.
5. **Styling** – Theme-level recipes in `src/theme/recipes/`; component-specific variants with `cva` in `ComponentName.styles.ts`.
6. **Tests** – Unit tests next to the module (`*.test.tsx` / `*.test.ts`); integration tests in `src/__tests__/integration/`. Use Vitest + Testing Library; add vitest-axe for a11y when relevant.
7. **Rules to follow**: `react-next-components.mdc`, `panda-styling.mdc`, `testing.mdc`, `react-compiler-client.mdc`, `accessibility.mdc`.

## Changing theme or styling

- Edit recipes/tokens in `src/theme/` and wire them in `panda.config.ts` and `src/theme/recipes/index.ts`.
- Run `panda codegen` (or `pnpm prepare`) after changes.
- Rule: `.cursor/rules/theme.mdc`, `.cursor/rules/panda-styling.mdc`.

## App Router (routes, layout, metadata)

- Routes and layout live under `src/app/`. Prefer server components; use `"use client"` only where needed.
- Rule: `.cursor/rules/app-router.mdc`.

## Commits

- Use **conventional commits** (`type(scope): description`). Rule: `.cursor/rules/git-commits.mdc`.

## Rule index

| Rule | When it applies |
|------|------------------|
| `project-overview.mdc` | Always |
| `git-commits.mdc` | Always |
| `react-next-components.mdc` | `src/**/*.tsx` |
| `panda-styling.mdc` | `src/**/*.{ts,tsx}` |
| `theme.mdc` | `src/theme/**` |
| `app-router.mdc` | `src/app/**` |
| `testing.mdc` | `*.test.{ts,tsx}`, `src/__tests__/**` |
| `typescript.mdc` | `**/*.ts`, `**/*.tsx` |
| `accessibility.mdc` | `src/**/*.tsx` |
| `react-compiler-client.mdc` | `src/**/*.tsx` |
