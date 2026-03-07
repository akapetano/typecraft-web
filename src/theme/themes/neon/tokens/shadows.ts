import { defineSemanticTokens } from "@pandacss/dev";

export const shadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 6px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 8px {colors.accent.secondary.a5}",
    },
  },
  sm: {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 10px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 12px {colors.accent.secondary.a5}",
    },
  },
  md: {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 14px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 16px {colors.accent.secondary.a5}",
    },
  },
  lg: {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 20px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 24px {colors.accent.secondary.a5}",
    },
  },
  xl: {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 28px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 32px {colors.accent.secondary.a5}",
    },
  },
  "2xl": {
    value: {
      _light:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 36px {colors.accent.secondary.a4}",
      _dark:
        "0px 0px 0px {colors.gray.a4}, 0px 0px 40px {colors.accent.secondary.a5}",
    },
  },
  inset: {
    value: {
      _light: "inset 0 0 8px {colors.accent.primary.a3}",
      _dark: "inset 0 0 10px {colors.accent.primary.a4}",
    },
  },
});
