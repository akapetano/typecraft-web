import { defineSemanticTokens } from "@pandacss/dev";

export const shadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light: "0px 1px 1px {colors.gray.a5}, 0px 0px 1px {colors.gray.a6}",
      _dark:
        "0px 1px 1px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  sm: {
    value: {
      _light: "0px 1px 2px {colors.gray.a4}, 0px 0px 1px {colors.gray.a4}",
      _dark:
        "0px 1px 2px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  md: {
    value: {
      _light: "0px 2px 4px {colors.gray.a4}, 0px 0px 1px {colors.gray.a4}",
      _dark:
        "0px 2px 4px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  lg: {
    value: {
      _light: "0px 4px 8px {colors.gray.a4}, 0px 0px 1px {colors.gray.a4}",
      _dark:
        "0px 4px 8px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  xl: {
    value: {
      _light: "0px 8px 14px {colors.gray.a4}, 0px 0px 1px {colors.gray.a4}",
      _dark:
        "0px 8px 14px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  "2xl": {
    value: {
      _light: "0px 12px 20px {colors.gray.a4}, 0px 0px 1px {colors.gray.a4}",
      _dark:
        "0px 12px 20px {colors.black.a8}, 0px 0px 1px inset {colors.gray.a7}",
    },
  },
  inset: {
    value: {
      _light: "inset 6px 0 10px -6px {colors.gray.a4}",
      _dark: "inset 6px 0 10px -6px {colors.black.a6}",
    },
  },
});
