import { defineSemanticTokens } from "@pandacss/dev";

export const radii = defineSemanticTokens.radii({
  l1: {
    value: "{radii.2xs}",
  },
  l2: {
    value: "{radii.xs}",
  },
  l3: {
    value: "{radii.sm}",
  },
});
