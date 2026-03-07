import { gold } from "@/theme/colors/gold";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { pink } from "@/theme/colors/pink";
import { plum } from "@/theme/colors/plum";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

const sakuraSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: pink,
        secondary: plum,
        tertiary: gold,
      },
      gray: NEUTRAL_PALETTES.mauve,
      ...coreAppSemanticColors,
      bg: {
        default: {
          value: {
            _light: "{colors.gray.1}",
            _dark: "{colors.gray.1}",
          },
        },
      },
      border: {
        value: {
          _light: "{colors.gray.4}",
          _dark: "{colors.gray.4}",
        },
      },
      typing: {
        current: {
          bg: { value: "{colors.accent.primary.a2}" },
          underline: { value: "{colors.accent.primary.8}" },
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
          fg: { value: "{colors.accent.tertiary.10}" },
          bg: { value: "{colors.accent.tertiary.a3}" },
        },
      },
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
    radii: {
      l1: {
        value: "{radii.sm}",
      },

      l2: {
        value: "{radii.md}",
      },

      l3: {
        value: "{radii.lg}",
      },
    },
  },
});

export const sakuraTheme = {
  ...sakuraSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-pink-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-plum-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-gold-9), transparent), linear-gradient(135deg, var(--colors-pink-4), var(--colors-plum-4), var(--colors-gold-4))",
      },
    },
  },
};
