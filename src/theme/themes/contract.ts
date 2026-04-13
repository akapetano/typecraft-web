import { defineThemeContract } from "@pandacss/dev";

/**
 * App Theme Contract
 *
 * Defines the semantic token interface that all themes must implement.
 *
 * Components must consume semantic roles (fg, bg, accent, typing, etc.)
 * instead of referencing palette tokens directly.
 *
 * Themes map palette tokens into these roles.
 *
 * Documentation:
 * docs/design-system/theme-contract.md
 */

export const defineAppTheme = defineThemeContract({
  semanticTokens: {
    colors: {
      accent: {
        primary: {},
        secondary: {},
        tertiary: {},
      },
      gray: {},
      bg: { default: {} },
      fg: { default: {}, muted: {}, subtle: {} },
      border: {},
      success: {},
      warning: {},
      error: {},
      typing: {
        current: {
          bg: {},
          underline: {},
        },
        correct: {
          fg: {},
          bg: {},
        },
        incorrect: {
          fg: {},
          bg: {},
        },
        incorrectRemedied: {
          fg: {},
          bg: {},
        },
      },
    },

    shadows: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      "2xl": {},
      inset: {},
    },

    radii: {
      l1: {},
      l2: {},
      l3: {},
    },

    easings: {
      standard: {},
      enter: {},
      exit: {},
      emphasized: {},
      snappy: {},
    },
  },
});
