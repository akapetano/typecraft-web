export const globalCss = {
  extend: {
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
