import { cyan } from "@/theme/colors/cyan";
import { lime } from "@/theme/colors/lime";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { purple } from "@/theme/colors/purple";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { neonColorOverrides } from "@/theme/themes/neon/colors";
import { neonTokenOverrides } from "@/theme/themes/neon/tokens";

const neonSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: lime,
        secondary: cyan,
        tertiary: purple,
      },
      gray: NEUTRAL_PALETTES.slate,
      ...coreAppSemanticColors,
      ...neonColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
    ...neonTokenOverrides,
  },
});

export const neonTheme = {
  ...neonSemantic,
  tokens: {
    gradients: {
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-lime-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-cyan-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-purple-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-lime-4), var(--colors-cyan-4), var(--colors-purple-4))",
      },
    },
  },
};
