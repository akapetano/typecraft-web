import { defineConfig } from "@pandacss/dev";
import { animationStyles } from "@/theme/animation-styles";
import { amber } from "@/theme/colors/amber";
import { green } from "@/theme/colors/green";
import { mint } from "@/theme/colors/mint";
import { orange } from "@/theme/colors/orange";
import { red } from "@/theme/colors/red";
import { sage } from "@/theme/colors/sage";
import { violet } from "@/theme/colors/violet";
import { conditions } from "@/theme/conditions";
import { fonts } from "@/theme/fonts";
import { globalCss } from "@/theme/global-css";
import { keyframes } from "@/theme/keyframes";
import { layerStyles } from "@/theme/layer-styles";
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
          accent: {
            primary: mint,
            secondary: violet,
            tertiary: sage,
          },
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
          warning: orange,
          incorrectRemedied: amber,
          error: red,
          mint: mint,
          gray: sage,
          red: red,
          orange: orange,
          amber: amber,
          green: green,
          violet: violet,
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
