import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  jsx: ["Button", "IconButton", "CloseButton", "ButtonGroup"],
  base: {
    alignItems: "center",
    appearance: "none",
    borderRadius: "l2",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: "0",
    fontWeight: "semibold",
    gap: "2",
    isolation: "isolate",
    justifyContent: "center",
    outline: "0",
    position: "relative",
    transition: "colors",
    transitionProperty: "background-color, border-color, color, box-shadow",
    userSelect: "none",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    _icon: {
      flexShrink: "0",
    },
    _disabled: {
      layerStyle: "disabled",
    },
    focusVisibleRing: "outside",
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
  variants: {
    variant: {
      solid: {
        bg: "accent.primary.solid.bg",
        color: "accent.primary.solid.fg",
        _hover: {
          bg: "accent.primary.solid.bg.hover",
        },
      },
      surface: {
        bg: "accent.primary.surface.bg",
        borderWidth: "1px",
        borderColor: "accent.primary.surface.border",
        color: "accent.primary.surface.fg",
        _hover: {
          borderColor: "accent.primary.surface.border.hover",
        },
        _active: {
          bg: "accent.primary.surface.bg.active",
        },
        _on: {
          bg: "accent.primary.surface.bg.active",
        },
      },
      subtle: {
        bg: "accent.primary.subtle.bg",
        color: "accent.primary.subtle.fg",
        _hover: {
          bg: "accent.primary.subtle.bg.hover",
        },
        _active: {
          bg: "accent.primary.subtle.bg.active",
        },
        _on: {
          bg: "accent.primary.subtle.bg.active",
        },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "accent.primary.outline.border",
        color: "accent.primary.outline.fg",
        _hover: {
          bg: "accent.primary.outline.bg.hover",
        },
        _active: {
          bg: "accent.primary.outline.bg.active",
        },
        _on: {
          bg: "accent.primary.outline.bg.active",
        },
      },
      plain: {
        color: "accent.primary.plain.fg",
        _hover: {
          bg: "accent.primary.plain.bg.hover",
        },
        _active: {
          bg: "accent.primary.plain.bg.active",
        },
        _on: {
          bg: "accent.primary.plain.bg.active",
        },
      },
    },
    size: {
      "2xs": {
        h: "6",
        minW: "6",
        textStyle: "xs",
        px: "2",
        _icon: { boxSize: "3.5" },
      },
      xs: {
        h: "8",
        minW: "8",
        textStyle: "sm",
        px: "2.5",
        _icon: { boxSize: "4" },
      },
      sm: {
        h: "9",
        minW: "9",
        textStyle: "sm",
        px: "3",
        _icon: { boxSize: "4" },
      },
      md: {
        h: "10",
        minW: "10",
        textStyle: "sm",
        px: "3.5",
        _icon: { boxSize: "5" },
      },
      lg: {
        h: "11",
        minW: "11",
        textStyle: "md",
        px: "4",
        _icon: { boxSize: "5" },
      },
      xl: {
        h: "12",
        minW: "12",
        textStyle: "md",
        px: "4.5",
        _icon: { boxSize: "5.5" },
      },
      "2xl": {
        h: "16",
        minW: "16",
        textStyle: "xl",
        px: "6",
        _icon: { boxSize: "6" },
      },
    },
  },
});
