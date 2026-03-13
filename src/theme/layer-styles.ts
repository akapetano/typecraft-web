import { defineLayerStyles } from "@pandacss/dev";

/**
 * Surface and elevation layer styles.
 *
 * Use these instead of ad hoc bg + border + shadow so layered UI stays
 * consistent. See docs/design-system/surface-elevation.md.
 *
 */
export const layerStyles = defineLayerStyles({
  disabled: {
    value: {
      cursor: "not-allowed",
      opacity: "0.67",
      filter: "grayscale(100%)",
    },
  },

  /** Low-emphasis container: subtle tint, no border or shadow. */
  surfaceSubtle: {
    value: {
      backgroundColor: "{colors.gray.subtle.bg}",
    },
  },

  /** Raised panel: solid surface with border, no shadow (e.g. cards, inputs). */
  surfaceRaised: {
    value: {
      backgroundColor: "{colors.gray.surface.bg}",
      borderWidth: "thin",
      borderColor: "{colors.gray.surface.border}",
    },
  },

  /** Elevated panel: solid surface with shadow (e.g. cards, floating panels). */
  surfaceElevated: {
    value: {
      backgroundColor: "{colors.gray.surface.bg}",
      boxShadow: "{shadows.lg}",
    },
  },

  /** Overlay surface: for dropdowns, popovers, menus (elevated + mid shadow). */
  surfaceOverlay: {
    value: {
      backgroundColor: "{colors.gray.surface.bg}",
      boxShadow: "{shadows.md}",
    },
  },
});
