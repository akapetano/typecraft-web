import { amber } from "@/theme/colors/amber";
import { brown } from "@/theme/colors/brown";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

const vintageSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: brown,
        secondary: amber,
        tertiary: NEUTRAL_PALETTES.olive,
      },
      gray: NEUTRAL_PALETTES.sand,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const vintageTheme = {
  ...vintageSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-brown-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-amber-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-olive-9), transparent), linear-gradient(135deg, var(--colors-brown-4), var(--colors-amber-4), var(--colors-olive-4))",
      },
    },
  },
};
