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
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 25%),
          radial-gradient(circle at 20% 20%, var(--colors-pink-a3), transparent 55%),
          radial-gradient(circle at 80% 15%, var(--colors-orange-a3), transparent 50%),
          radial-gradient(circle at 50% 80%, var(--colors-sky-a3), transparent 55%),
          linear-gradient(180deg, transparent, var(--colors-sky-a1))
          `,
      },
      marble: {
        value: `
          radial-gradient(circle at 28% 50%, var(--colors-pink-9) 0%, transparent 100%),
          radial-gradient(circle at 62% 32%, var(--colors-orange-9) 0%, transparent 100%),
          radial-gradient(circle at 52% 76%, var(--colors-sky-9) 0%, transparent 100%),
          linear-gradient(135deg, var(--colors-pink-4), var(--colors-orange-4), var(--colors-sky-4))
          `,
      },
    },
  },
};
