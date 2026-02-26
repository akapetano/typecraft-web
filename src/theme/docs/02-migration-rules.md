# Migration Rules

## Rule 1 — Components consume roles, not raw palettes

✅ Allowed:

- `bg.default`, `fg.default`, `border`
- `accent.primary`, `accent.secondary`, `accent.tertiary`
- `status.success|warning|error`

🚫 Avoid in components:

- Direct palette usage (e.g. `mint.9`, `violet.11`, `colors.mint.*`)
- Theme-specific colors inside component code

## Rule 2 — Theme changes happen at the root

Themes should be applied via root attributes (e.g. `data-theme`) and implemented
through token mappings / CSS variables.

## Rule 3 — Prefer incremental migration

Do not refactor large parts of UI just to “standardize”. Migrate
opportunistically:

- touched component → migrate to semantic roles
- new component → semantic-only from day one
