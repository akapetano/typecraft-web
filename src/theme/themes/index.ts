import { auroraTheme } from "@/theme/themes/aurora";
import { monoTheme } from "@/theme/themes/mono";

export const APP_THEMES = {
  aurora: auroraTheme,
  mono: monoTheme,
} as const;

export const THEME_NAMES = ["aurora", "mono"];
