import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { orange } from "@/theme/colors/orange";
import { pink } from "@/theme/colors/pink";
import { sky } from "@/theme/colors/sky";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { duskColorOverrides } from "@/theme/themes/dusk/colors";

const duskSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: pink,
        secondary: orange,
        tertiary: sky,
      },
      gray: NEUTRAL_PALETTES.mauve,
      ...coreAppSemanticColors,
      ...duskColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const duskTheme = {
  ...duskSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-pink-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-orange-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-sky-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-pink-4), var(--colors-orange-4), var(--colors-sky-4))",
      },
    },
  },
};
