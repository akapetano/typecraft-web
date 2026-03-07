import { defineRecipe } from "@pandacss/dev";

export const marble = defineRecipe({
  className: "marble",
  jsx: ["ThemeMarble"],
  base: {
    display: "inline-block",
    flexShrink: 0,
    borderRadius: "full",
    borderWidth: "1px",
    borderColor: "border",
    overflow: "hidden",
    bgGradient: "marble",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxShadow: "inset 0 0 0 1px var(--colors-gray-a3)",
  },
});
