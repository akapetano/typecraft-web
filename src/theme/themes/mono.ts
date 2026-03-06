import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

export const monoTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: NEUTRAL_PALETTES.neutral,
        secondary: NEUTRAL_PALETTES.neutral,
        tertiary: NEUTRAL_PALETTES.neutral,
      },
      gray: NEUTRAL_PALETTES.neutral,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});
