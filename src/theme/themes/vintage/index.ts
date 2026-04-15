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
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a1), transparent 25%),
          radial-gradient(circle at 20% 20%, var(--colors-brown-a3), transparent 60%),
          radial-gradient(circle at 80% 15%, var(--colors-amber-a2), transparent 60%),
          radial-gradient(circle at 50% 80%, var(--colors-bronze-a2), transparent 65%),
          linear-gradient(180deg, transparent, var(--colors-bronze-a1))
        `,
      },
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-brown-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-amber-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-bronze-9), transparent), linear-gradient(135deg, var(--colors-brown-4), var(--colors-amber-4), var(--colors-bronze-4))",
      },
    },
  },
};
