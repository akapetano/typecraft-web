# Token Contract (Semantic)

## Goal

Provide a stable semantic API so themes can change without rewriting UI.

Components must consume **semantic tokens**, not palette colors.  
Themes map palette tokens to semantic roles.

This allows themes to change color systems without requiring component updates.

---

# Semantic Groups (v1)

## Background

`bg.default`

Represents the primary application canvas or base surface.

Themes may adjust this to create different atmospheres.

---

## Foreground

```code
fg.default
fg.muted
fg.subtle
```

Used for text and icon hierarchy.

| Token        | Usage                  |
| ------------ | ---------------------- |
| `fg.default` | primary text           |
| `fg.muted`   | secondary text         |
| `fg.subtle`  | tertiary / helper text |

---

## Borders

`border`

Used for:

- input outlines
- separators
- container boundaries

---

## Accent Colors

Accent tokens represent the **theme personality**.

```code
accent.primary
accent.secondary
accent.tertiary
```

Typical usage:

| Token              | Purpose                |
| ------------------ | ---------------------- |
| `accent.primary`   | main interactive color |
| `accent.secondary` | complementary accent   |
| `accent.tertiary`  | supporting accent      |

Optional future extension:

`accent.1..accent.8`

Used for:

- charts
- shaders
- extended UI accents

---

## Neutral Palette

`gray`

Each theme selects a neutral palette (e.g. slate, mauve, olive, sand).

Used for:

- backgrounds
- text
- borders
- shadows

---

## Surface and elevation

Use **layer styles** for containers instead of ad hoc bg + border + shadow:

- `surfaceSubtle` — subtle background only
- `surfaceRaised` — `gray.surface.bg` + border
- `surfaceElevated` — `gray.surface.bg` + `shadows.lg`
- `surfaceOverlay` — `gray.surface.bg` + `shadows.md` (menus, popovers)

Surface tokens (from the neutral `gray` palette):

- `gray.surface.bg`, `gray.surface.border`, `gray.surface.fg`
- `gray.subtle.bg`, `gray.subtle.fg`
- `gray.outline.border` (and outline bg/fg where used)

Full semantics and usage: `docs/design-system/surface-elevation.md`.

---

## Status Colors

Status tokens represent semantic UI states.

```code
success
warning
error
```

Used for:

- validation states
- alerts
- status indicators

These are typically stable across themes.

---

## Typing Tokens

Typing tokens support the typing test UI.

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

These tokens allow the typing experience to remain theme-aware.

---

## Elevation

```code
shadows.xs
shadows.sm
shadows.md
shadows.lg
shadows.xl
shadows.2xl
shadows.inset
```

Represents UI elevation.

Themes may override these to express a different visual style.

---

## Shape

```code
radii.l1
radii.l2
radii.l3
```

Defines corner rounding tiers.

| Token | Example usage    |
| ----- | ---------------- |
| `l1`  | small controls   |
| `l2`  | buttons / inputs |
| `l3`  | containers       |

Themes may override these to create different visual personalities.

---

# Raw Palette Tokens

Raw palette tokens exist under:

`colors.*`

Examples:

```code
colors.mint.9
colors.gray.4
colors.orange.9
```

These tokens should **not be used in components**.

Palette tokens should only appear inside **themes** where they are mapped to
semantic roles.
