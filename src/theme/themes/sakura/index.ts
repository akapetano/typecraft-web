import { gold } from "@/theme/colors/gold";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { pink } from "@/theme/colors/pink";
import { plum } from "@/theme/colors/plum";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { sakuraColorOverrides } from "@/theme/themes/sakura/colors";
import { sakuraTokenOverrides } from "@/theme/themes/sakura/tokens";

const sakuraSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: pink,
        secondary: plum,
        tertiary: gold,
      },
      gray: NEUTRAL_PALETTES.mauve,
      ...coreAppSemanticColors,
      ...sakuraColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
    ...sakuraTokenOverrides,
  },
});

export const sakuraTheme = {
  ...sakuraSemantic,
  tokens: {
    gradients: {
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 25%),
          radial-gradient(circle at 20% 20%, var(--colors-pink-a2), transparent 60%),
          radial-gradient(circle at 80% 15%, var(--colors-plum-a2), transparent 55%),
          radial-gradient(circle at 50% 80%, var(--colors-gold-a1), transparent 65%)
        `,
      },
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-pink-9), transparent), radial-gradient(circle at 62% 32%, var(--colors-plum-9), transparent), radial-gradient(circle at 52% 76%, var(--colors-gold-9), transparent), linear-gradient(135deg, var(--colors-pink-4), var(--colors-plum-4), var(--colors-gold-4))",
      },
    },
  },
};
