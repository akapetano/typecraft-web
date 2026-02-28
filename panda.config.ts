import { defineConfig } from "@pandacss/dev";
import { animationStyles } from "@/theme/animation-styles";
import { amber } from "@/theme/colors/amber";
import { green } from "@/theme/colors/green";
import { mint } from "@/theme/colors/mint";
import { orange } from "@/theme/colors/orange";
import { red } from "@/theme/colors/red";
import { violet } from "@/theme/colors/violet";
import { conditions } from "@/theme/conditions";
import { fonts } from "@/theme/fonts";
import { globalCss } from "@/theme/global-css";
import { keyframes } from "@/theme/keyframes";
import { layerStyles } from "@/theme/layer-styles";
import { recipes, slotRecipes } from "@/theme/recipes";
import { textStyles } from "@/theme/text-styles";
import { APP_THEMES, THEME_NAMES } from "@/theme/themes/index";
import { colors } from "@/theme/tokens/colors";
import { durations } from "@/theme/tokens/durations";
import { shadows } from "@/theme/tokens/shadows";
import { zIndex } from "@/theme/tokens/z-index";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/constants/**/*.{ts,tsx,js,jsx}",
    "./src/recipes/**/*.{ts,tsx,js,jsx}",
    "./src/styled-system/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      tokens: {
        colors,
        durations,
        zIndex,
        fonts,
      },

      semanticTokens: {
        colors: {
          brand: mint,
          success: green,
          warning: orange,
          incorrectRemedied: amber,
          error: red,
          mint: mint,
          red,
          orange,
          amber,
          green,
          violet,
        },

        shadows: shadows,

        radii: {
          l1: {
            value: "{radii.xs}",
          },

          l2: {
            value: "{radii.sm}",
          },

          l3: {
            value: "{radii.md}",
          },
        },
      },
    },
  },

  themes: {
    aurora: APP_THEMES.aurora,
    mono: APP_THEMES.mono,
  },
  staticCss: {
    themes: THEME_NAMES,
  },

  jsxFramework: "react",
  outdir: "styled-system",
  globalCss: globalCss,
  conditions: conditions,
  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],
});
