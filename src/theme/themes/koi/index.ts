import { cyan } from "@/theme/colors/cyan";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { orange } from "@/theme/colors/orange";
import { red } from "@/theme/colors/red";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { koiColorOverrides } from "@/theme/themes/koi/colors";

const koiSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: orange,
        secondary: red,
        tertiary: cyan,
      },
      gray: NEUTRAL_PALETTES.mauve,
      ...coreAppSemanticColors,
      ...koiColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const koiTheme = {
  ...koiSemantic,
  tokens: {
    gradients: {
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 25%),
          radial-gradient(circle at 25% 25%, var(--colors-orange-a3), transparent 60%),
          radial-gradient(circle at 75% 20%, var(--colors-red-a3), transparent 65%),
          radial-gradient(circle at 50% 85%, var(--colors-cyan-a3), transparent 70%),
          radial-gradient(circle at 50% 90%, var(--colors-cyan-a2), transparent 85%)
          `,
      },
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-orange-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-red-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-cyan-9), transparent), linear-gradient(135deg, var(--colors-orange-4), var(--colors-red-4), var(--colors-cyan-4))",
      },
    },
  },
};
