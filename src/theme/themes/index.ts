import { auroraTheme } from "@/theme/themes/aurora";
import { emberTheme } from "@/theme/themes/ember";
import { forestTheme } from "@/theme/themes/forest";
import { monoTheme } from "@/theme/themes/mono";
import { oceanTheme } from "@/theme/themes/ocean";
import { THEMES } from "@/types/theme/theme";

export const APP_THEMES = {
  aurora: auroraTheme,
  mono: monoTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  ember: emberTheme,
} as const;

export const THEME_NAMES = [...THEMES];

export const themes = {
  ...APP_THEMES,
};
