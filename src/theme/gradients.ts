import { defineSemanticTokens } from "@pandacss/dev";

export const gradients = defineSemanticTokens.gradients({
  brand: {
    value: {
      _light: {
        type: "linear",
        placement: "to right",
        stops: ["{colors.mint.9}", "{colors.violet.9}"],
      },
      _dark: {
        type: "linear",
        placement: "to right",
        stops: ["{colors.mint.10}", "{colors.violet.10}"],
      },
    },
  },
  brandSoft: {
    value: {
      _light: {
        type: "linear",
        placement: "to bottom right",
        stops: ["{colors.mint.8}", "{colors.violet.8}", "{colors.mint.9}"],
      },
      _dark: {
        type: "linear",
        placement: "to bottom right",
        stops: ["{colors.mint.11}", "{colors.violet.11}", "{colors.mint.10}"],
      },
    },
  },
  brandSubtle: {
    value: {
      _light: {
        type: "linear",
        placement: "to right",
        stops: ["{colors.mint.4}", "{colors.violet.4}"],
      },
      _dark: {
        type: "linear",
        placement: "to right",
        stops: ["{colors.mint.5}", "{colors.violet.5}"],
      },
    },
  },
});
