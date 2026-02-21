import { cva } from "styled-system/css";

export const characterStyles = cva({
  base: {
    fontSize: "3xl",
    fontFamily: "code",
    transitionProperty: "color, background-color, text-decoration-color",
    transitionDuration: "faster",
    borderRadius: "l2",
  },
  variants: {
    state: {
      pending: {
        color: "fg.muted",
        opacity: 0.6,
      },
      current: {
        color: "fg",
        bg: "brand.a2",
        textDecorationLine: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "2px",
        textDecorationColor: "brand.9",
      },
      correctFirstTry: {
        color: "success.10",
        bg: "success.a3",
      },
      incorrect: {
        color: "error.10",
        bg: "error.a3",
      },
      incorrectRemedied: {
        color: "incorrectRemedied.10",
        bg: "incorrectRemedied.a3",
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
