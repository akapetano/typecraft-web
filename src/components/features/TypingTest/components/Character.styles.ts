import { cva } from "styled-system/css";

export const characterStyles = cva({
  base: {
    fontSize: "2xl",
    fontFamily: "code",
    transitionProperty: "color, background-color, text-decoration-color",
    transitionDuration: "faster",
  },
  variants: {
    state: {
      current: {
        color: "fg",
        bg: "brand.a2",
        textDecorationLine: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "2px",
        textDecorationColor: "brand.9",
        borderRadius: "sm",
      },
      correct: {
        color: "success.10",
        bg: "success.a3",
      },
      incorrect: {
        color: "error.10",
        bg: "error.a3",
      },
      untyped: {
        color: "fg.muted",
        opacity: 0.6,
      },
    },
    punctuation: {
      true: {
        letterSpacing: "tight",
        marginStart: "-2",
      },
    },
  },
});
