import { defineSemanticTokens } from "@pandacss/dev";

export const orange = defineSemanticTokens.colors({
  "1": { value: { _light: "#fffbf5", _dark: "#160f0d" } },
  "2": { value: { _light: "#fff7ed", _dark: "#1f1510" } },
  "3": { value: { _light: "#ffedd5", _dark: "#351c10" } },
  "4": { value: { _light: "#ffdfba", _dark: "#4b1c03" } },
  "5": { value: { _light: "#ffd3a0", _dark: "#592508" } },
  "6": { value: { _light: "#ffc182", _dark: "#693318" } },
  "7": { value: { _light: "#f5a962", _dark: "#804326" } },
  "8": { value: { _light: "#ec8e4b", _dark: "#a55630" } },
  "9": { value: { _light: "#f76b15", _dark: "#f76b15" } },
  "10": { value: { _light: "#ed5f00", _dark: "#e95f00" } },
  "11": { value: { _light: "#bd4b00", _dark: "#ff9c69" } },
  "12": { value: { _light: "#7c2d0d", _dark: "#ffdcca" } },
  a1: { value: { _light: "#ff550003", _dark: "#e6000006" } },
  a2: { value: { _light: "#ff550008", _dark: "#ff55000f" } },
  a3: { value: { _light: "#ff44000d", _dark: "#fd590b27" } },
  a4: { value: { _light: "#ff4c0014", _dark: "#fc3e003f" } },
  a5: { value: { _light: "#ff4d0021", _dark: "#fd53004e" } },
  a6: { value: { _light: "#ff4d002e", _dark: "#fd6c245f" } },
  a7: { value: { _light: "#e5450042", _dark: "#ff7d3e77" } },
  a8: { value: { _light: "#c73e0058", _dark: "#ff80439f" } },
  a9: { value: { _light: "#ad3300a8", _dark: "#fe6d15f7" } },
  a10: { value: { _light: "#a02f00b8", _dark: "#fe6600e8" } },
  a11: { value: { _light: "#8c2900d4", _dark: "#ff9c69" } },
  a12: { value: { _light: "#4d1600eb", _dark: "#ffdcca" } },
  solid: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.orange.9}", _dark: "{colors.orange.9}" },
      },
      hover: {
        value: { _light: "{colors.orange.10}", _dark: "{colors.orange.10}" },
      },
    },
    fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
  },
  subtle: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
      },
      hover: {
        value: { _light: "{colors.orange.a4}", _dark: "{colors.orange.a4}" },
      },
      active: {
        value: { _light: "{colors.orange.a5}", _dark: "{colors.orange.a5}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
      },
    },
  },
  surface: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a2}", _dark: "{colors.orange.a2}" },
      },
      active: {
        value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
      },
    },
    border: {
      DEFAULT: {
        value: { _light: "{colors.orange.a6}", _dark: "{colors.orange.a6}" },
      },
      hover: {
        value: { _light: "{colors.orange.a7}", _dark: "{colors.orange.a7}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
      },
    },
  },
  outline: {
    bg: {
      hover: {
        value: { _light: "{colors.orange.a2}", _dark: "{colors.orange.a2}" },
      },
      active: {
        value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
      },
    },
    border: {
      DEFAULT: {
        value: { _light: "{colors.orange.a7}", _dark: "{colors.orange.a7}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
      },
    },
  },
  plain: {
    bg: {
      hover: {
        value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
      },
      active: {
        value: { _light: "{colors.orange.a4}", _dark: "{colors.orange.a4}" },
      },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
      },
    },
  },
});
