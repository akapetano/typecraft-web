# Surface and elevation

This document defines the semantic approach for **surfaces** and **elevation** in the design system. The goal is to avoid ad hoc combinations of backgrounds, borders, and shadows and instead use a small set of named roles and layer styles.

---

## Surface roles

Surfaces are layered on top of the base canvas (`bg.default`). Use these roles consistently so themes and components stay predictable.

| Role | Purpose | Token / usage |
|------|---------|----------------|
| **Base** | Page or app canvas | `bg.default` |
| **Subtle** | Low-emphasis container; slight tint, no border | `gray.subtle.bg` (and optional `.hover`, `.active`) |
| **Raised** | Panel with a clear edge (cards, inputs) | `gray.surface.bg` + `gray.surface.border` |
| **Elevated** | Panel that floats (shadow, no border) | `gray.surface.bg` + `shadows.lg` |
| **Overlay** | Floating UI (menus, popovers, dropdowns) | `gray.surface.bg` + `shadows.md` |

- **Base** is the root background; everything else sits on top of it.
- **Subtle** is for low-contrast containers (e.g. card variant “subtle”, input variant “subtle”).
- **Raised** is for bordered panels (cards, inputs, surfaces that need a clear outline).
- **Elevated** and **Overlay** are for floating content; overlay is used for dropdowns/menus so elevation stays consistent.

---

## Layer styles

Prefer **layer styles** over manual bg + border + shadow so styling stays consistent.

Defined in `src/theme/layer-styles.ts`:

| Layer style | Use case |
|-------------|----------|
| `surfaceSubtle` | Subtle containers (card subtle, input subtle) |
| `surfaceRaised` | Bordered panels (card outline, input surface) |
| `surfaceElevated` | Elevated cards, floating panels |
| `surfaceOverlay` | Menus, popovers, dropdowns |

Usage in recipes:

```ts
root: {
  layerStyle: "surfaceElevated",
}
```

Do not combine a surface layer style with extra `bg` / `borderWidth` / `boxShadow` unless you are intentionally overriding (e.g. focus ring). Use one layer style per surface.

---

## Tokens

### Backgrounds

- `bg.default` — Base canvas (body, main layout).
- `gray.subtle.bg` — Subtle surface (with optional `gray.subtle.bg.hover`, `gray.subtle.bg.active`).
- `gray.surface.bg` — Raised/elevated/overlay surface (with optional `gray.surface.bg.hover`, `gray.surface.bg.active`).

### Borders

- `border` — Generic separator/outline (e.g. dividers, marble).
- `gray.surface.border` — Edge of raised surfaces (with optional `gray.surface.border.hover`).
- `gray.outline.border` — Outline-style controls (e.g. input outline variant).

### Shadows

Semantic shadows represent elevation; themes may override them:

- `shadows.xs` … `shadows.2xl` — Elevation levels.
- `shadows.inset` — Inset (e.g. marble, sunken areas).

Use `shadows.md` for overlays (menus, popovers) and `shadows.lg` for elevated cards/panels. Do not mix raw palette shadows in components.

---

## Inset treatments

For sunken or inset areas (e.g. ThemeMarble), use:

- `boxShadow: "shadows.inset"`
- Optional `border` + `borderColor: "border"` for a soft edge.

Avoid ad hoc inset shadows; use the semantic `shadows.inset` token so themes can control the look.

---

## Theme contract

Themes must provide the neutral `gray` structure used by surfaces:

- `gray.surface.bg` (DEFAULT, hover, active)
- `gray.surface.border` (DEFAULT, hover)
- `gray.surface.fg`
- `gray.subtle.bg` (DEFAULT, hover, active)
- `gray.subtle.fg`
- `gray.outline.border` (and outline bg/fg where used)

These are implemented by the neutral palettes (e.g. neutral, slate, mauve) and selected per theme. Components and recipes must not reference raw palette colors for surfaces; use the semantic tokens above or the layer styles.

---

## Summary

1. Use **layer styles** (`surfaceSubtle`, `surfaceRaised`, `surfaceElevated`, `surfaceOverlay`) for containers instead of ad hoc bg + border + shadow.
2. Use **semantic tokens** (`gray.surface.*`, `gray.subtle.*`, `shadows.*`, `border`) instead of raw palette tokens.
3. Reserve **elevated** for shadow-only floating panels and **overlay** for dropdowns/menus so elevation is consistent and themeable.
