import { defineAnimationStyles } from "@pandacss/dev";
import { motionReduceAnimation } from "@/theme/motion/animations";

export const animationStyles = defineAnimationStyles({
  "slide-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationDuration: "fast",
      animationTimingFunction: "enter",
      "&[data-placement^=top]": {
        animationName: "slide-from-bottom, fade-in",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-from-top, fade-in",
      },
      "&[data-placement^=left]": {
        animationName: "slide-from-right, fade-in",
      },
      "&[data-placement^=right]": {
        animationName: "slide-from-left, fade-in",
      },
      _motionReduce: {
        animationName: "fade-in",
        ...motionReduceAnimation,
      },
    },
  },

  "slide-fade-out": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationDuration: "faster",
      animationTimingFunction: "exit",
      "&[data-placement^=top]": {
        animationName: "slide-to-bottom, fade-out",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-to-top, fade-out",
      },
      "&[data-placement^=left]": {
        animationName: "slide-to-right, fade-out",
      },
      "&[data-placement^=right]": {
        animationName: "slide-to-left, fade-out",
      },
      _motionReduce: {
        animationName: "fade-out",
        ...motionReduceAnimation,
      },
    },
  },

  "scale-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationName: "scale-in, fade-in",
      animationDuration: "normal",
      animationTimingFunction: "enter",
      _motionReduce: {
        animationName: "fade-in",
        ...motionReduceAnimation,
      },
    },
  },

  "scale-fade-out": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationName: "scale-out, fade-out",
      animationDuration: "fast",
      animationTimingFunction: "exit",
      _motionReduce: {
        animationName: "fade-out",
        ...motionReduceAnimation,
      },
    },
  },
});
