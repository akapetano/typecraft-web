import { coreAppSemanticColors } from "@/theme/themes/coreSemantics";

export const neonColorOverrides = {
  bg: {
    ...coreAppSemanticColors.bg,
    default: {
      value: {
        _light: "{colors.gray.1}",
        _dark: "{colors.black}",
      },
    },
  },

  fg: {
    ...coreAppSemanticColors.fg,
    subtle: {
      value: {
        _light: "{colors.gray.9}",
        _dark: "{colors.gray.9}",
      },
    },
  },

  border: {
    value: {
      _light: "{colors.gray.4}",
      _dark: "{colors.gray.5}",
    },
  },

  typing: {
    ...coreAppSemanticColors.typing,
    current: {
      bg: { value: "{colors.accent.primary.a3}" },
      underline: { value: "{colors.accent.secondary.9}" },
    },
    incorrectRemedied: {
      fg: { value: "{colors.accent.tertiary.10}" },
      bg: { value: "{colors.accent.tertiary.a3}" },
    },
  },
} as const;
