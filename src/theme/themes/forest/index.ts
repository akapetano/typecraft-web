import { grass } from "@/theme/colors/grass";
import { jade } from "@/theme/colors/jade";
import { lime } from "@/theme/colors/lime";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { forestColorOverrides } from "@/theme/themes/forest/tokens/colors";

const forestSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: jade,
        secondary: grass,
        tertiary: lime,
      },
      gray: NEUTRAL_PALETTES.olive,
      ...coreAppSemanticColors,
      ...forestColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const forestTheme = {
  ...forestSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-jade-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-grass-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-lime-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-jade-4), var(--colors-grass-4), var(--colors-lime-4))",
      },
    },
  },
};
