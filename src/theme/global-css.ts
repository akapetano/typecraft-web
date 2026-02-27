import { COLOR_PALETTE } from "@/constants/colorPalette";

export const globalCss = {
  extend: {
    "*": {
      "--global-color-border": "colors.border",
      "--global-color-placeholder": "colors.fg.subtle",
      "--global-color-selection": "colors.accent.primary.subtle.bg",
      "--global-color-focus-ring": "colors.accent.primary.solid.bg",
    },
    html: {
      colorPalette: COLOR_PALETTE,
    },
    body: {
      background: "bg.default",
      color: "fg.default",
      fontFamily: "body",
    },
  },
};
