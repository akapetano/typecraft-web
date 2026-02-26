# Token Contract (Semantic)

## Goal

Provide a stable semantic API so themes can change without rewriting UI.

## Semantic groups (v1)

- `bg.*` — canvas/surfaces
- `fg.*` — text/icon colors
- `border.*` — separators + outlines
- `accent.*` — interactive brand accents (themeable)
- `status.*` — success/warning/error (mostly stable across themes)
- `typing.*` — typing-specific states (stable by default; adjust later if
  needed)

## Accent roles (v1 minimal)

- `accent.primary`
- `accent.secondary`
- `accent.tertiary`

Optional (later):

- `accent.1..accent.8` pool for shaders/charts
