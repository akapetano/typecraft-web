import { defineTokens } from "@pandacss/dev";

export const easings = defineTokens.easings({
  in: {
    cubic: { value: "cubic-bezier(.55, .055, .675, .19)" },
    quart: { value: "cubic-bezier(.895, .03, .685, .22)" },
  },
  out: {
    cubic: { value: "cubic-bezier(.215, .61, .355, 1)" },
    quart: { value: "cubic-bezier(.165, .84, .44, 1)" },
    expo: { value: "cubic-bezier(.19, 1, .22, 1)" },
  },
  inOut: {
    cubic: { value: "cubic-bezier(.645, .045, .355, 1)" },
    quart: { value: "cubic-bezier(.77, 0, .175, 1)" },
  },
});
