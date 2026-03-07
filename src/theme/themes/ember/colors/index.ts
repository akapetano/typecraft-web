import { coreAppSemanticColors } from "@/theme/themes/coreSemantics";

export const emberColorOverrides = {
  bg: {
    ...coreAppSemanticColors.bg,
    default: {
      value: {
        _light: "{colors.gray.1}",
        _dark: "{colors.gray.1}",
      },
    },
  },
  fg: {
    ...coreAppSemanticColors.fg,
    subtle: {
      value: {
        _light: "{colors.gray.9}",
        _dark: "{colors.gray.10}",
      },
    },
  },
  border: {
    value: {
      _light: "{colors.gray.3}",
      _dark: "{colors.gray.4}",
    },
  },
  typing: {
    ...coreAppSemanticColors.typing,
    current: {
      bg: { value: "{colors.accent.primary.a2}" },
      underline: { value: "{colors.accent.primary.9}" },
    },
    incorrectRemedied: {
      fg: { value: "{colors.accent.tertiary.10}" },
      bg: { value: "{colors.accent.tertiary.a3}" },
    },
  },
} as const;
