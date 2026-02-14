import { defineSemanticTokens } from "@pandacss/dev";

export const amber = defineSemanticTokens.colors({
  "1": { value: { _light: "#fefdfb", _dark: "#1c1917" } },
  "2": { value: { _light: "#fefbe9", _dark: "#26221b" } },
  "3": { value: { _light: "#fef3c7", _dark: "#393119" } },
  "4": { value: { _light: "#fde68a", _dark: "#4a3c1a" } },
  "5": { value: { _light: "#fcd34d", _dark: "#5c4a1e" } },
  "6": { value: { _light: "#fbbf24", _dark: "#6b5a2a" } },
  "7": { value: { _light: "#f59e0b", _dark: "#836b32" } },
  "8": { value: { _light: "#d97706", _dark: "#a3833e" } },
  "9": { value: { _light: "#b45309", _dark: "#ca8a04" } },
  "10": { value: { _light: "#92400e", _dark: "#d4a012" } },
  "11": { value: { _light: "#78350f", _dark: "#e5b567" } },
  "12": { value: { _light: "#451a03", _dark: "#f7e4b4" } },
  a1: { value: { _light: "#c0800004", _dark: "#f5e10608" } },
  a2: { value: { _light: "#e5a5000a", _dark: "#fcdc2412" } },
  a3: { value: { _light: "#f5b8001a", _dark: "#fedc5425" } },
  a4: { value: { _light: "#f5b20032", _dark: "#fedc6e33" } },
  a5: { value: { _light: "#f5a8004d", _dark: "#fedc8442" } },
  a6: { value: { _light: "#ed9b0066", _dark: "#fedc9a52" } },
  a7: { value: { _light: "#e08c0080", _dark: "#fedcad66" } },
  a8: { value: { _light: "#c77b0099", _dark: "#fedcad85" } },
  a9: { value: { _light: "#b45309a8", _dark: "#ca8a04f5" } },
  a10: { value: { _light: "#92400eb8", _dark: "#d4a012eb" } },
  a11: { value: { _light: "#78350fd4", _dark: "#e5b567" } },
  a12: { value: { _light: "#451a03eb", _dark: "#f7e4b4" } },
  solid: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.amber.9}", _dark: "{colors.amber.9}" },
      },
      hover: {
        value: { _light: "{colors.amber.10}", _dark: "{colors.amber.10}" },
      },
    },
    fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
  },
  subtle: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
      },
      hover: {
        value: { _light: "{colors.amber.a4}", _dark: "{colors.amber.a4}" },
      },
      active: {
        value: { _light: "{colors.amber.a5}", _dark: "{colors.amber.a5}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
      },
    },
  },
  surface: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a2}", _dark: "{colors.amber.a2}" },
      },
      active: {
        value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
      },
    },
    border: {
      DEFAULT: {
        value: { _light: "{colors.amber.a6}", _dark: "{colors.amber.a6}" },
      },
      hover: {
        value: { _light: "{colors.amber.a7}", _dark: "{colors.amber.a7}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
      },
    },
  },
  outline: {
    bg: {
      hover: {
        value: { _light: "{colors.amber.a2}", _dark: "{colors.amber.a2}" },
      },
      active: {
        value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
      },
    },
    border: {
      DEFAULT: {
        value: { _light: "{colors.amber.a7}", _dark: "{colors.amber.a7}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
      },
    },
  },
  plain: {
    bg: {
      hover: {
        value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
      },
      active: {
        value: { _light: "{colors.amber.a4}", _dark: "{colors.amber.a4}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
      },
    },
  },
});
