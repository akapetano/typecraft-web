import { mint } from "@/theme/colors/mint";
import { sage } from "@/theme/colors/sage";
import { violet } from "@/theme/colors/violet";
import { defineAppTheme } from "@/theme/themes/contract";

export const auroraTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: mint,
        secondary: violet,
        tertiary: sage,
      },
    },
  },
});
