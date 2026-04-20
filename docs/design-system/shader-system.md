# Shader System

This document describes the shader gradient system introduced in v1 of the
Typecraft design system.

---

## Purpose

The shader is a full-viewport background gradient applied at the layout level.
Its role is to add ambient depth and theme personality without competing with
content. A well-tuned shader is nearly invisible — you notice its absence more
than its presence.

---

## Shader vs. marble gradients

The design system defines two gradient tokens per theme. They serve different
purposes and must not be swapped.

| | `shader` | `marble` |
|---|---|---|
| **Purpose** | Full-viewport ambient background | Compact theme preview swatch |
| **Applied to** | `ShaderBackground` (layout-level) | `ThemeMarble` component |
| **Alpha range** | `a1`–`a3` (very low opacity) | `9` (fully opaque scale steps) |
| **Spread** | Wide (50–85% radii) | Tight, fills a small circle |
| **Content on top** | Yes — all page content | No — decorative only |
| **CSS property** | `bgGradient: "shader"` | `bgGradient: "marble"` |

Marble gradients use opaque palette colors (`colors.mint.9`) at high saturation
because they render at small sizes. Shaders use alpha-channel colors
(`colors.mint.a3`) at very low opacity because they sit behind all content.

---

## Where shader is applied

Shaders are applied **only at the layout level** via the `ShaderBackground`
component:

```
src/components/shared/ShaderBackground/ShaderBackground.tsx
```

```tsx
<Box
  minH="100vh"
  display="flex"
  flexDirection="column"
  bg="bg.default"
  bgGradient="shader"
  {...props}
/>
```

`ShaderBackground` is the root of `AppLayout`, which wraps every page. Do not
apply `bgGradient: "shader"` to individual components or sections — shaders are
a layout-level concern only.

---

## Shader structure

A shader gradient is a stacked CSS `background` value composed of named layers.
Each layer serves a specific role.

### Top fade (required)

```css
linear-gradient(180deg, var(--colors-gray-a2), transparent 20-25%)
```

Adds a very subtle tint at the top edge, grounding the header visually. Uses the
neutral gray alpha palette so it adapts to both light and dark modes.

### Radial accents (0–3 per theme)

```css
radial-gradient(circle at X% Y%, var(--colors-{accent}-a2|a3), transparent 50-70%)
```

Place soft color pools at the corners and lower area of the viewport. Each
accent color from the theme gets one radial, positioned so they do not overlap
heavily. Common positions:

| Position | Purpose |
|---|---|
| `20% 20%` | Top-left accent (primary) |
| `80% 15%` | Top-right accent (secondary) |
| `50% 80%` | Bottom center accent (tertiary) |

### Bottom grounding (optional)

```css
linear-gradient(180deg, transparent, var(--colors-{accent}-a1|a2))
```

A very faint bottom-up gradient that anchors the bottom of the page. Uses `a1`
or `a2` (lower than radials). Only include when the bottom of the page otherwise
feels unanchored.

---

## Theme patterns

### Mono — linear only

Mono themes use no radial accents. Only the top and (optionally) bottom linear
gradients are present. This keeps the background completely neutral.

```ts
shader: {
  value: `
    linear-gradient(180deg, var(--colors-gray-a1), transparent 25%),
    linear-gradient(180deg, transparent, var(--colors-gray-a2))
  `,
}
```

Use this pattern for achromatic or minimal themes where color expression comes
entirely from the accent tokens used in components, not the background.

### Expressive themes — 2–3 radials

Most themes use a top fade, two or three radial accents matching the theme's
`accent.primary`, `accent.secondary`, and `accent.tertiary`, and an optional
bottom grounding gradient.

```ts
// Example: aurora theme
shader: {
  value: `
    linear-gradient(180deg, var(--colors-gray-a2), transparent 20%),
    radial-gradient(circle at 20% 20%, var(--colors-mint-a3), transparent 55%),
    radial-gradient(circle at 80% 15%, var(--colors-iris-a3), transparent 50%),
    radial-gradient(circle at 50% 80%, var(--colors-sky-a3), transparent 55%),
    linear-gradient(180deg, transparent, var(--colors-sky-a2))
  `,
}
```

The layer order matters: CSS backgrounds are drawn from top to bottom. Layers
listed first sit on top. The top fade should be the first entry.

---

## Guidelines for theme authors

### Keep shaders subtle

The shader must not draw attention. If you can clearly identify individual color
blobs while looking at a page with content, the shader is too strong.

### Avoid high-intensity alpha tokens (`a4` and above)

Alpha steps `a4`+  are noticeable at full viewport size. Use `a1`–`a3` for
radials and `a1`–`a2` for linear bottom grounding. Reserve `a3` for the most
expressive radial only if the theme is intentionally vibrant.

### Prefer wider spreads (55–70%+)

Small radial radii produce visible blobs. Use 50% as a minimum spread; 55–70%
is the typical range. A spread of 80–90% for a bottom grounding radial is
acceptable since the center is at the bottom edge and most of the gradient falls
off-screen.

### Avoid sharp edges and visible blobs

If you can see where a radial starts or ends, the spread is too tight or the
alpha is too high. Both adjustments should be made together — halving the alpha
while tightening the spread usually makes things worse; widen the spread first.

### Ensure content remains dominant

Text, inputs, and interactive elements must remain clearly readable over the
shader. If any part of the page becomes harder to read at any scroll position,
the shader is interfering and must be attenuated.

---

## Common pitfalls

### Haloed content

**Symptom**: Text or components appear to glow or have a visible halo around
them where a radial accent happens to sit behind them.

**Cause**: Radial positioned too close to center screen, or alpha too high.

**Fix**: Move radials toward corners (top-left, top-right, bottom center) and
reduce alpha from `a3` to `a2`.

---

### Overly saturated backgrounds

**Symptom**: The page background reads as colored rather than neutral.

**Cause**: Using alpha steps `a4`+ or using multiple overlapping radials of the
same hue.

**Fix**: Use `a2`–`a3` maximum. Ensure accents are from distinct palette
families so they do not reinforce each other.

---

### Competing gradients

**Symptom**: The background looks busy or has visible banding between color
regions.

**Cause**: Radials positioned too close together, or spread values that are too
tight, causing visible transitions between gradients.

**Fix**: Increase spread values so each radial feathers into the others. Verify
that the center points are well-separated (at least 30–40 viewport-percent
apart horizontally or vertically).

---

## Token reference

Shaders consume raw alpha palette tokens directly inside the theme definition.
This is the one permitted place to use raw palette tokens outside of semantic
token mappings, because shaders are part of the theme definition itself, not a
component.

```ts
// Permitted inside theme gradient definitions only
var(--colors-mint-a3)
var(--colors-gray-a2)

// Not permitted in components or recipes
colors.mint.a3
```

Shaders do **not** use semantic tokens such as `accent.primary.a3` because CSS
gradient strings cannot reference Panda CSS semantic tokens — they require
resolved CSS variable names.

---

## Adding a shader to a new theme

1. Identify the theme's three accent palettes (`accent.primary`,
   `accent.secondary`, `accent.tertiary`).
2. Start with the standard expressive template: top fade + three radials +
   optional bottom grounding.
3. Use `a3` for primary and secondary radials, `a2` or `a1` for the tertiary
   and bottom grounding.
4. Set radial spreads to 55–65%. Widen if blobs are visible.
5. Position radials at `20% 20%`, `80% 15%`, and `50% 80%`.
6. Check the shader on a page with representative content in both light and dark
   modes.
7. If the background reads as colored rather than neutral, reduce all alpha
   values by one step.
