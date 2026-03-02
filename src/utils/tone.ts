import type {
  ButtonVariantProps,
  InputVariantProps,
} from "styled-system/recipes";
import type { Tone } from "@/types/theme/tone";

export const toneToAccentPath = (tone: Tone) => `accent.${tone}` as const;

type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>;

export const createButtonToneCss = (tone: Tone, variant: ButtonVariant) => {
  const base = toneToAccentPath(tone);

  switch (variant) {
    case "solid":
      return {
        bg: `${base}.solid.bg`,
        color: `${base}.solid.fg`,
        _hover: { bg: `${base}.solid.bg.hover` },
      };

    case "surface":
      return {
        bg: `${base}.surface.bg`,
        borderWidth: "1px",
        borderColor: `${base}.surface.border`,
        color: `${base}.surface.fg`,
        _hover: { borderColor: `${base}.surface.border.hover` },
        _active: { bg: `${base}.surface.bg.active` },
        _on: { bg: `${base}.surface.bg.active` },
      };

    case "subtle":
      return {
        bg: `${base}.subtle.bg`,
        color: `${base}.subtle.fg`,
        _hover: { bg: `${base}.subtle.bg.hover` },
        _active: { bg: `${base}.subtle.bg.active` },
        _on: { bg: `${base}.subtle.bg.active` },
      };

    case "outline":
      return {
        borderWidth: "1px",
        borderColor: `${base}.outline.border`,
        color: `${base}.outline.fg`,
        _hover: { bg: `${base}.outline.bg.hover` },
        _active: { bg: `${base}.outline.bg.active` },
        _on: { bg: `${base}.outline.bg.active` },
      };

    case "plain":
      return {
        color: `${base}.plain.fg`,
        _hover: { bg: `${base}.plain.bg.hover` },
        _active: { bg: `${base}.plain.bg.active` },
        _on: { bg: `${base}.plain.bg.active` },
      };
  }
};

type InputVariant = NonNullable<InputVariantProps["variant"]>;

export const createInputToneCss = (tone: Tone, variant: InputVariant) => {
  const base = toneToAccentPath(tone);

  switch (variant) {
    case "outline":
    case "surface":
    case "subtle":
      return {
        focusRingColor: `${base}.solid.bg`,
      };

    case "flushed":
      return {
        _focus: {
          borderColor: `${base}.solid.bg`,
          boxShadowColor: `${base}.solid.bg`,
          boxShadow: "0 1px 0 0 var(--shadow-color)",
          _invalid: {
            borderColor: "error",
            boxShadowColor: "error",
          },
        },
      };
  }
};
