import { defineSemanticTokens } from "@pandacss/dev";

export const easings = defineSemanticTokens.easings({
  standard: { value: "{easings.out.cubic}" },
  enter: { value: "{easings.out.cubic}" },
  exit: { value: "{easings.in.cubic}" },
  emphasized: { value: "{easings.inOut.cubic}" },
  snappy: { value: "{easings.out.quart}" },
});
