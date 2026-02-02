import { COLOR_PALETTE } from "@/constants/colorPalette";

export const globalCss = {
  extend: {
    "*": {
      "--global-color-border": "colors.border",
      "--global-color-placeholder": "colors.fg.subtle",
      "--global-color-selection": "colors.colorPalette.subtle.bg",
      "--global-color-focus-ring": "colors.colorPalette.solid.bg",
    },
    html: {
      colorPalette: "gray",
    },
    body: {
      background: "bg.default",
      color: "fg.default",
      colorPalette: COLOR_PALETTE,
      fontFamily: "body",
    },
    // Semantic gradient tokens: Panda references var(--gradients-*) but does not emit them.
    // Define them here so bgGradient/textGradient token names work; use color vars for theme.
    ":root, [data-color-mode=light]": {
      "--gradients-brand":
        "linear-gradient(to right, var(--colors-mint-9), var(--colors-violet-9))",
      "--gradients-brand-soft":
        "linear-gradient(to bottom right, var(--colors-mint-8), var(--colors-violet-8), var(--colors-mint-9))",
      "--gradients-brand-subtle":
        "linear-gradient(to right, var(--colors-mint-4), var(--colors-violet-4))",
    },
    "[data-color-mode=dark]": {
      "--gradients-brand":
        "linear-gradient(to right, var(--colors-mint-10), var(--colors-violet-10))",
      "--gradients-brand-soft":
        "linear-gradient(to bottom right, var(--colors-mint-11), var(--colors-violet-11), var(--colors-mint-10))",
      "--gradients-brand-subtle":
        "linear-gradient(to right, var(--colors-mint-5), var(--colors-violet-5))",
    },
  },
};
