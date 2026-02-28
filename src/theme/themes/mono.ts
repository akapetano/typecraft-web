import { sage } from "@/theme/colors/sage"; // neutral "gray" palette
import { defineAppTheme } from "@/theme/themes/contract";

export const monoTheme = defineAppTheme({
  semanticTokens: {
    colors: {
      accent: {
        primary: sage,
        secondary: sage,
        tertiary: sage,
      },
    },
  },
});
