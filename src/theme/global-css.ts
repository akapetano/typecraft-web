export const globalCss = {
  extend: {
    html: {
      colorPalette: "accent.primary",
    },
    "*": {
      "--global-color-border": "colors.border",
      "--global-color-placeholder": "colors.fg.subtle",
      "--global-color-selection": "colors.accent.primary.subtle.bg",
      "--global-color-focus-ring": "colors.accent.primary.solid.bg",
    },
    body: {
      background: "bg.default",
      color: "fg.default",
      fontFamily: "body",
    },
  },
};
