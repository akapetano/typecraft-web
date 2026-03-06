import { defineThemeContract } from "@pandacss/dev";

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
  },
});
