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
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 25%),
          radial-gradient(circle at 22% 20%, var(--colors-lime-a2), transparent 65%),
          radial-gradient(circle at 85% 10%, var(--colors-cyan-a3), transparent 75%),
          radial-gradient(circle at 50% 82%, var(--colors-purple-a2), transparent 70%),
          radial-gradient(circle at 50% 95%, var(--colors-cyan-a2), transparent 90%)
        `,
      },
      marble: {
        value: `
          radial-gradient(circle at 28% 50%, var(--colors-lime-9) 0%, transparent 100%),
          radial-gradient(circle at 62% 32%, var(--colors-cyan-9) 0%, transparent 100%),
          radial-gradient(circle at 52% 76%, var(--colors-purple-9) 0%, transparent 100%),
          linear-gradient(135deg, var(--colors-lime-4), var(--colors-cyan-4), var(--colors-purple-4))
          `,
      },
    },
  },
};
