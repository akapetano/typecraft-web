import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { monoSharedTokens } from "@/theme/themes/mono/tokens";

const monoSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: NEUTRAL_PALETTES.neutral,
        secondary: NEUTRAL_PALETTES.neutral,
        tertiary: NEUTRAL_PALETTES.neutral,
      },
      gray: NEUTRAL_PALETTES.neutral,
      ...coreAppSemanticColors,
      typing: {
        ...coreAppSemanticColors.typing,
        current: {
          bg: { value: "{colors.gray.a3}" },
          underline: { value: "{colors.gray.9}" },
        },
      },
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
    ...monoSharedTokens,
  },
});

export const monoTheme = {
  ...monoSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "linear-gradient(220deg, var(--colors-gray-12), var(--colors-gray-2))",
      },
    },
  },
};
