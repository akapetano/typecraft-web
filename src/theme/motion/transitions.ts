export const interactiveTransition = {
  transitionProperty: "background-color, border-color, color, box-shadow",
  transitionDuration: "fast",
  transitionTimingFunction: "standard",
} as const;

export const textTransition = {
  transitionProperty: "color, background-color, text-decoration-color",
  transitionDuration: "faster",
  transitionTimingFunction: "standard",
} as const;
