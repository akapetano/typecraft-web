import { amber } from "@/theme/colors/amber";
import { bronze } from "@/theme/colors/bronze";
import { brown } from "@/theme/colors/brown";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { vintageColorOverrides } from "@/theme/themes/vintage/colors";
import { vintageTokenOverrides } from "@/theme/themes/vintage/tokens";

const vintageSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: brown,
        secondary: amber,
        tertiary: bronze,
      },
      gray: NEUTRAL_PALETTES.sand,
      ...coreAppSemanticColors,
      ...vintageColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
    ...vintageTokenOverrides,
  },
});

export const vintageTheme = {
  ...vintageSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-brown-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-amber-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-bronze-9), transparent), linear-gradient(135deg, var(--colors-brown-4), var(--colors-amber-4), var(--colors-bronze-4))",
      },
    },
  },
};
