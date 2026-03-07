import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { orange } from "@/theme/colors/orange";
import { pink } from "@/theme/colors/pink";
import { ruby } from "@/theme/colors/ruby";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

const sunsetSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: orange,
        secondary: ruby,
        tertiary: pink,
      },
      gray: NEUTRAL_PALETTES.mauve,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const sunsetTheme = {
  ...sunsetSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-orange-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-ruby-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-pink-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-orange-4), var(--colors-ruby-4), var(--colors-pink-4))",
      },
    },
  },
};
