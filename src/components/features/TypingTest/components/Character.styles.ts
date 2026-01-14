import { cva } from "styled-system/css";

export const characterStyles = cva({
  base: {
    fontSize: "2xl",
    fontFamily: "code",
    transitionProperty: "color, background-color, text-decoration-color",
    transitionDuration: "faster",
    letterSpacing: "wide",
  },
  variants: {
    state: {
      current: {
        color: "fg",
        textDecorationLine: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "2px",
        textDecorationColor: "brand.9",
      },
      correct: {
        color: "success",
      },
      incorrect: {
        color: "error",
        bg: "red.a3",
        borderRadius: "sm",
      },
      untyped: {
        color: "fg.muted",
        opacity: 0.6,
      },
    },
    punctuation: {
      true: {
        letterSpacing: "normal",
        marginStart: "-1",
      },
      false: {
        letterSpacing: "wider",
      },
    },
  },
});
