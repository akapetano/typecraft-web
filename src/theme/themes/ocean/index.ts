import { cyan } from "@/theme/colors/cyan";
import { NEUTRAL_PALETTES } from "@/theme/colors/neutrals";
import { sky } from "@/theme/colors/sky";
import { teal } from "@/theme/colors/teal";
import { defineAppTheme } from "@/theme/themes/contract";
import {
  coreAppSemanticColors,
  coreAppSharedSemantics,
  parkUiCompatPalettes,
} from "@/theme/themes/coreSemantics";
import { oceanColorOverrides } from "@/theme/themes/ocean/colors";

const oceanSemantic = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: cyan,
        secondary: teal,
        tertiary: sky,
      },
      gray: NEUTRAL_PALETTES.slate,
      ...coreAppSemanticColors,
      ...oceanColorOverrides,
      ...parkUiCompatPalettes,
    },
    ...coreAppSharedSemantics,
  },
});

export const oceanTheme = {
  ...oceanSemantic,
  tokens: {
    gradients: {
      shader: {
        value: `
          linear-gradient(180deg, var(--colors-gray-a2), transparent 25%),
          radial-gradient(circle at 18% 20%, var(--colors-cyan-a2), transparent 60%),
          radial-gradient(circle at 82% 18%, var(--colors-teal-a3), transparent 55%),
          radial-gradient(circle at 50% 82%, var(--colors-sky-a2), transparent 65%),
          radial-gradient(circle at 50% 90%, var(--colors-sky-a1), transparent 85%)
        `,
      },
      marble: {
        value:
          "radial-gradient(circle at 28% 50%, var(--colors-cyan-9) 0%, transparent 100%), radial-gradient(circle at 62% 32%, var(--colors-teal-9) 0%, transparent 100%), radial-gradient(circle at 52% 76%, var(--colors-sky-9) 0%, transparent 100%), linear-gradient(135deg, var(--colors-cyan-4), var(--colors-teal-4), var(--colors-sky-4))",
      },
    },
  },
};
