import { coreAppSemanticColors } from "@/theme/themes/coreSemantics";

export const duskColorOverrides = {
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
      underline: { value: "{colors.accent.secondary.9}" },
    },
    incorrectRemedied: {
      fg: { value: "{colors.accent.secondary.10}" },
      bg: { value: "{colors.accent.secondary.a3}" },
    },
  },
} as const;
