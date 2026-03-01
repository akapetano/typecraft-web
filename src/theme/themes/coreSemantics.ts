import { amber } from "@/theme/colors/amber";
import { green } from "@/theme/colors/green";
import { mint } from "@/theme/colors/mint";
import { orange } from "@/theme/colors/orange";
import { red } from "@/theme/colors/red";
import { violet } from "@/theme/colors/violet";
import { shadows } from "@/theme/tokens/shadows";

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
  success: green,
  warning: orange,
  incorrectRemedied: amber,
  error: red,
} as const;

export const parkUiCompatPalettes = {
  red,
  orange,
  amber,
  green,
  violet,
  mint,
} as const;

export const coreAppSemanticTokens = {
  shadows: shadows,

  radii: {
    l1: {
      value: "{radii.xs}",
    },

    l2: {
      value: "{radii.sm}",
    },

    l3: {
      value: "{radii.md}",
    },
  },
};
