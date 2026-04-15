export const motionReduceTransition = {
  transitionDuration: "fastest",
} as const;

export const interactiveTransition = {
  transitionProperty: "background-color, border-color, color, box-shadow",
  transitionDuration: "fast",
  transitionTimingFunction: "standard",
  _motionReduce: { ...motionReduceTransition },
} as const;

export const textTransition = {
  transitionProperty: "color, background-color, text-decoration-color",
  transitionDuration: "faster",
  transitionTimingFunction: "standard",
  _motionReduce: { ...motionReduceTransition },
} as const;
