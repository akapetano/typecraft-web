import { auroraTheme } from "@/theme/themes/aurora";
import { forestTheme } from "@/theme/themes/forest";
import { monoTheme } from "@/theme/themes/mono";
import { THEMES } from "@/types/theme/theme";

export const APP_THEMES = {
  aurora: auroraTheme,
  mono: monoTheme,
  forest: forestTheme,
} as const;

export const THEME_NAMES = [...THEMES];

export const themes = {
  aurora: APP_THEMES.aurora,
  mono: APP_THEMES.mono,
  forest: APP_THEMES.forest,
};
