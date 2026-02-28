export const coreAppSemanticColors = {
  bg: {
    default: {
      value: {
        _light: "{colors.white}",
        _dark: "{colors.gray.1}",
      },
    },
  },
  fg: {
    default: {
      value: {
        _light: "{colors.gray.12}",
        _dark: "{colors.gray.12}",
      },
    },
    muted: {
      value: {
        _light: "{colors.gray.11}",
        _dark: "{colors.gray.11}",
      },
    },
    subtle: {
      value: {
        _light: "{colors.gray.10}",
        _dark: "{colors.gray.10}",
      },
    },
  },
  border: {
    value: {
      _light: "{colors.gray.4}",
      _dark: "{colors.gray.4}",
    },
  },
} as const;
