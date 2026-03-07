import { amber } from "@/theme/colors/amber";
import { crimson } from "@/theme/colors/crimson";
import { cyan } from "@/theme/colors/cyan";
import { grass } from "@/theme/colors/grass";
import { green } from "@/theme/colors/green";
import { iris } from "@/theme/colors/iris";
import { jade } from "@/theme/colors/jade";
import { lime } from "@/theme/colors/lime";
import { mint } from "@/theme/colors/mint";
import { orange } from "@/theme/colors/orange";
import { red } from "@/theme/colors/red";
import { sky } from "@/theme/colors/sky";
import { teal } from "@/theme/colors/teal";
import { tomato } from "@/theme/colors/tomato";
import { violet } from "@/theme/colors/violet";
import { radii } from "@/theme/tokens/radii";
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
  warning: amber,
  error: red,
  typing: {
    current: {
      bg: { value: "{colors.accent.primary.a2}" },
      underline: { value: "{colors.accent.primary.9}" },
    },
    correct: {
      fg: { value: "{colors.success.10}" },
      bg: { value: "{colors.success.a3}" },
    },
    incorrect: {
      fg: { value: "{colors.error.10}" },
      bg: { value: "{colors.error.a3}" },
    },
    incorrectRemedied: {
      fg: { value: "{colors.warning.10}" },
      bg: { value: "{colors.warning.a3}" },
    },
  },
} as const;

export const parkUiCompatPalettes = {
  red,
  orange,
  amber,
  green,
  violet,
  mint,
  iris,
  sky,
  jade,
  grass,
  lime,
  cyan,
  teal,
  tomato,
  crimson,
} as const;

export const coreAppSharedSemantics = {
  shadows: shadows,
  radii: radii,
};
