import { cva } from "styled-system/css";
import { textTransition } from "@/theme/motion/transitions";

export const characterStyles = cva({
  base: {
    fontSize: "3xl",
    fontFamily: "code",
    borderRadius: "l2",
    ...textTransition,
  },
  variants: {
    state: {
      pending: {
        color: "fg.muted",
        opacity: 0.6,
      },
      current: {
        color: "fg.default",
        bg: "typing.current.bg",
        textDecorationLine: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "2px",
        textDecorationColor: "typing.current.underline",
      },
      correctFirstTry: {
        color: "typing.correct.fg",
        bg: "typing.correct.bg",
      },
      incorrect: {
        color: "typing.incorrect.fg",
        bg: "typing.incorrect.bg",
      },
      incorrectRemedied: {
        color: "typing.incorrectRemedied.fg",
        bg: "typing.incorrectRemedied.bg",
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
