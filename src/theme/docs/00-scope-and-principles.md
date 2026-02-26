# Design System — Scope & Principles

## Scope

The Design System defines the foundational visual + interaction layer of
Typecraft.

It includes:

- Semantic token taxonomy (surfaces, text, borders, states)
- Named theme architecture (data-theme)
- Accent roles and neutral pairings
- Theme switching and persistence
- Motion guidelines (premium SaaS)
- Accessibility guidelines for color + motion
- (Later) shader integration parameters

## Out of scope (v1)

- Per-page theming
- Typography variants per theme
- Multiple shader types per theme
- Component redesigns not required for migration
- Feature-specific visuals (handled in feature projects)

## Principles

1. **Semantic contract first**: UI uses semantic roles, not raw palette tokens.
2. **Themes map roles**: themes only provide mappings, not component overrides.
3. **Minimal v1**: start with 3 accent roles + neutral pairing.
4. **Premium SaaS aesthetic**: subtle, restrained, calm motion.
5. **Accessibility is non-negotiable**: contrast + reduced motion support.
