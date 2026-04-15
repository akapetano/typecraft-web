import { iris } from "@/theme/colors/iris";
import { mint } from "@/theme/colors/mint";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { sky } from "@/theme/colors/sky";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";

const auroraSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: mint,
        secondary: iris,
        tertiary: sky,
      },
      gray: NEUTRAL_PALETTES.slate,
      ...coreAppSemanticColors,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const auroraTheme = {
  ...auroraSemantic,
  tokens: {
    gradients: {
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 20%),
          radial-gradient(circle at 20% 20%, var(--colors-mint-a3), transparent 55%),
          radial-gradient(circle at 80% 15%, var(--colors-iris-a3), transparent 50%),
          radial-gradient(circle at 50% 80%, var(--colors-sky-a3), transparent 55%),
          linear-gradient(180deg, transparent, var(--colors-sky-a2))
    `,
      },
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-mint-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-iris-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-sky-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-mint-4), var(--colors-iris-4), var(--colors-sky-4))",
      },
    },
  },
};
