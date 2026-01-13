import { defineRecipe } from "@pandacss/dev";

export const heading = defineRecipe({
  className: "heading",
  base: {
    fontWeight: "semibold",
  },
  defaultVariants: {
    size: "h2",
  },
  variants: {
    size: {
      h1: {
        textStyle: "5xl",
      },
      h2: {
        textStyle: "4xl",
      },
      h3: {
        textStyle: "3xl",
      },
      h4: {
        textStyle: "2xl",
      },
      h5: {
        textStyle: "lg",
      },
      h6: {
        textStyle: "md",
      },
    },
  },
});
