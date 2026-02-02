import { defineConfig } from "@pandacss/dev";
import { animationStyles } from "@/theme/animation-styles";
import { green } from "@/theme/colors/green";
import { mint } from "@/theme/colors/mint";
import { red } from "@/theme/colors/red";
import { sage } from "@/theme/colors/sage";
import { violet } from "@/theme/colors/violet";
import { conditions } from "@/theme/conditions";
import { fonts } from "@/theme/fonts";
import { globalCss } from "@/theme/global-css";
import { gradients } from "@/theme/gradients";
import { keyframes } from "@/theme/keyframes";
import { layerStyles } from "@/theme/layer-styles";
import { radii } from "@/theme/radii";
import { recipes, slotRecipes } from "@/theme/recipes";
import { textStyles } from "@/theme/text-styles";
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
          bg: {
            default: {
              value: {
                _light: "{colors.white}",
                _dark: "{colors.gray.1}",
              },
            },
          },
          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}",
              },
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}",
              },
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}",
              },
            },
          },

          border: {
            value: {
              _light: "{colors.gray.4}",
              _dark: "{colors.gray.4}",
            },
          },

          brand: mint,
          success: green,
          error: red,
          mint: mint,
          gray: sage,
          red: red,
          green: green,
          violet: violet,
        },

        gradients: gradients,

        shadows: shadows,

        radii: radii,
      },
    },
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
