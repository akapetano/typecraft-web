import { iris } from "@/theme/colors/iris";
import { mint } from "@/theme/colors/mint";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { sky } from "@/theme/colors/sky";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

export const auroraTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: mint,
        secondary: iris,
        tertiary: sky,
      },
      gray: NEUTRAL_PALETTES.slate,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});
