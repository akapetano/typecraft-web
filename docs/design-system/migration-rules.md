# Migration Rules

These rules guide the migration from palette-based styling to the semantic token
system.

---

## Rule 1 — Components consume roles, not raw palettes

Components must use **semantic tokens** instead of palette tokens.

✅ Allowed:

- `bg.default`
- `fg.default`, `fg.muted`, `fg.subtle`
- `border`
- `accent.primary`, `accent.secondary`, `accent.tertiary`
- `success`, `warning`, `error`
- `typing.*`

🚫 Avoid in components:

- Direct palette usage (e.g. `mint.9`, `violet.11`, `colors.mint.*`)
- Theme-specific colors inside component code
- Hardcoded CSS variables referencing palette tokens

Palette tokens belong **only inside themes**, where they are mapped to semantic
roles.

---

## Rule 2 — Theme changes happen at the root

Themes must be applied via root attributes (e.g. `data-theme`) and implemented
through token mappings or CSS variables.

Components should never depend on a specific theme name.

---

## Rule 3 — Prefer incremental migration

Do not refactor large areas of UI just to standardize tokens.

Migration should be **opportunistic**:

- touched component → migrate to semantic roles
- new component → semantic-only from day one

This keeps migration low-risk and avoids unnecessary churn.
