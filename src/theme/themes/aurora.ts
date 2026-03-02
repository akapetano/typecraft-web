import { mint } from "@/theme/colors/mint";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { violet } from "@/theme/colors/violet";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSemanticTokens,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

export const auroraTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: mint,
        secondary: violet,
        tertiary: NEUTRAL_PALETTES.sage,
      },
      gray: NEUTRAL_PALETTES.slate,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSemanticTokens,
  },
});
