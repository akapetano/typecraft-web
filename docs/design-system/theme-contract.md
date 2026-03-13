# Theme Contract

This document defines the **semantic token contract** used by the Typecraft
design system.

The contract establishes a clear separation between:

- **Raw palette tokens** — color scales (e.g. `colors.mint.9`)
- **Semantic tokens** — UI roles (e.g. `accent.primary`, `fg.muted`)

Components must rely **only on semantic tokens** so that themes can change
palettes without breaking UI styling.

## Implementation

The theme contract is implemented in:

`src/theme/themes/contract.ts`

Themes must conform to this contract.

---

# Design Principles

## 1. Components must use semantic roles

Components should **never depend on palette colors directly**.

❌ Avoid

```typescript
color: "colors.gray.12";
background: "colors.mint.a3";
```

✅ Prefer

```typescript
color: "fg.default";
background: "accent.primary.a3";
```

This ensures components remain **theme-agnostic**.

---

## 2. Themes provide palette mappings

Themes map palette colors into semantic roles.

Example:

```typescript
accent: {
  primary: mint,
  secondary: iris,
  tertiary: sky
}
```

This allows the same component to render differently across themes.

---

# Semantic Token Contract

## Accent Roles

Accent roles represent the **main expressive colors** of a theme.

```code
accent.primary
accent.secondary
accent.tertiary
```

Typical usage:

| Role      | Purpose                         |
| --------- | ------------------------------- |
| primary   | main interactive color          |
| secondary | complementary interactive color |
| tertiary  | additional accent for variation |

Examples:

```code
accent.primary.9
accent.primary.a2
accent.secondary.9
```

---

## Neutral Palette

```code
gray
```

Each theme selects a neutral palette such as:

- slate
- mauve
- olive
- sand
- neutral

Used for:

- backgrounds
- borders
- text

---

# Foreground Tokens

Foreground tokens control **text color hierarchy**.

```code
fg.default
fg.muted
fg.subtle
```

| Token      | Usage            |
| ---------- | ---------------- |
| fg.default | primary text     |
| fg.muted   | secondary text   |
| fg.subtle  | tertiary UI text |

---

# Background Tokens

```code
bg.default
```

Represents the main page background (base surface).

Themes may override this to create distinct visual atmospheres.

---

# Surface and elevation

Layered surfaces use the **neutral** `gray` structure and **layer styles** so
elevation is consistent. See `docs/design-system/surface-elevation.md` for the
full system.

- **Base surface**: `bg.default` (page canvas).
- **Subtle surface**: `gray.subtle.bg` (low-emphasis containers).
- **Raised / elevated / overlay**: `gray.surface.bg`, `gray.surface.border`;
  use layer styles `surfaceSubtle`, `surfaceRaised`, `surfaceElevated`,
  `surfaceOverlay` instead of ad hoc bg + border + shadow.

Themes provide `gray.surface`, `gray.subtle`, and `gray.outline` via the
selected neutral palette. Shadows (`shadows.xs` … `shadows.inset`) represent
elevation and may be overridden per theme.

---

# Border Tokens

```code
border
```

Used for:

- input borders
- separators
- container outlines

Should adapt to the theme's neutral palette.

---

# Status Tokens

These represent **semantic UI states**, not theme colors.

```code
success
warning
error
```

Typical uses:

- form validation
- notifications
- status indicators

---

# Typing Tokens

Typing tokens support the typing test UI.

```code
typing.current
typing.correct
typing.incorrect
typing.incorrectRemedied
```

Structure:

```code
typing.current.bg
typing.current.underline

typing.correct.fg
typing.correct.bg

typing.incorrect.fg
typing.incorrect.bg

typing.incorrectRemedied.fg
typing.incorrectRemedied.bg
```

These tokens allow themes to influence the typing experience without modifying
components.

---

# Shadows

```code
shadows.xs
shadows.sm
shadows.md
shadows.lg
shadows.xl
shadows.2xl
shadows.inset
```

Used to represent **elevation levels**.

Themes may override shadows to express a different visual language:

Examples:

- Neon → glowing shadows
- Vintage → dense shadows
- Sakura → soft shadows

---

# Radii

```code
radii.l1
radii.l2
radii.l3
```

These represent **corner rounding tiers**.

Typical usage:

| Token | Example usage    |
| ----- | ---------------- |
| l1    | small controls   |
| l2    | inputs / buttons |
| l3    | containers       |

Themes may override radii to express personality:

Examples:

| Theme   | Radii style |
| ------- | ----------- |
| Neon    | sharp       |
| Vintage | tighter     |
| Sakura  | softer      |

---

# Raw Palette Tokens

Raw palette tokens exist under:

```code
colors.*
```

These tokens should be used **only inside theme definitions**, not in component
styling.

---

# Theme Responsibilities

Themes are responsible for:

1. Selecting accent palettes
2. Selecting a neutral palette
3. Optionally overriding semantic tokens
4. Defining marble gradients
5. Optionally adjusting shadows and radii

Themes should **not modify component logic**.

---

# Summary

The theme contract ensures:

- components remain theme-agnostic
- themes control visual identity
- palette changes do not require component refactors
- styling remains scalable as the system grows

All new components must follow this contract.
