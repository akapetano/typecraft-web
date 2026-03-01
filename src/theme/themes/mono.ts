import { neutral } from "@/theme/colors/neutral";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSemanticTokens,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

export const monoTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: neutral,
        secondary: neutral,
        tertiary: neutral,
      },
      gray: neutral,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSemanticTokens,
  },
});
