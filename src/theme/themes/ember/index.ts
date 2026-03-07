import { amber } from "@/theme/colors/amber";
import { crimson } from "@/theme/colors/crimson";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { tomato } from "@/theme/colors/tomato";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { emberColorOverrides } from "@/theme/themes/ember/colors";

const emberSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: tomato,
        secondary: crimson,
        tertiary: amber,
      },
      gray: NEUTRAL_PALETTES.sand,
      ...coreAppSemanticColors,
      ...emberColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const emberTheme = {
  ...emberSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-tomato-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-crimson-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-amber-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-tomato-4), var(--colors-crimson-4), var(--colors-amber-4))",
      },
    },
  },
};
