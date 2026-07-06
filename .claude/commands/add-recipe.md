---
description: Scaffold a Panda recipe / cva variant and run codegen
argument-hint: <recipeName> [--slot for a slot recipe]
---

Add a new Panda style recipe named **$1** and wire it in. Decide the right kind
first, following `.cursor/rules/panda-styling.mdc` and `.cursor/rules/theme.mdc`:

- **Global theme recipe** (shared component like Button/Card/Heading): define in
  `src/theme/recipes/$1.ts` with `defineRecipe` (or `defineSlotRecipe` for a
  compound/slot recipe, e.g. when `--slot` is passed). Register the relevant
  `jsx` component names in the recipe.
- **Component-local variant** (feature-specific): prefer `cva` in a co-located
  `ComponentName.styles.ts` instead — no theme wiring needed.

For a theme recipe, wire it up:

1. Export it from `src/theme/recipes/index.ts` (add to `recipes` or
   `slotRecipes`).
2. Confirm it flows into `panda.config.ts` — that file already spreads
   `recipes` / `slotRecipes` from `@/theme/recipes`, so exporting from the index
   is usually enough. Only edit `panda.config.ts` if a new grouping is needed.
3. Use **semantic tokens only** (`fg.*`, `bg.default`, `border`, `accent.*`,
   `success`, `warning`, `error`, `typing.*`) — never raw palette tokens inside
   recipes.

Then run codegen so `styled-system/` is regenerated:

- `pnpm exec panda codegen` (or `pnpm prepare`).

After codegen, confirm the recipe is importable from `styled-system/recipes`
and summarize what was added and where.
