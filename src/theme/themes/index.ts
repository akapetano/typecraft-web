import { auroraTheme } from "@/theme/themes/aurora";
import { emberTheme } from "@/theme/themes/ember";
import { forestTheme } from "@/theme/themes/forest";
import { monoTheme } from "@/theme/themes/mono";
import { neonTheme } from "@/theme/themes/neon";
import { oceanTheme } from "@/theme/themes/ocean";
import { sakuraTheme } from "@/theme/themes/sakura";
import { sunsetTheme } from "@/theme/themes/sunset";
import { vintageTheme } from "@/theme/themes/vintage";
import { THEMES, type Theme } from "@/types/theme/theme";

export type AppThemeConfig =
  | typeof auroraTheme
  | typeof emberTheme
  | typeof forestTheme
  | typeof monoTheme
  | typeof neonTheme
  | typeof oceanTheme
  | typeof sakuraTheme
  | typeof sunsetTheme
  | typeof vintageTheme;

const THEME_ENTRIES: [Theme, AppThemeConfig][] = [
  ["aurora", auroraTheme],
  ["mono", monoTheme],
  ["forest", forestTheme],
  ["ocean", oceanTheme],
  ["ember", emberTheme],
  ["sunset", sunsetTheme],
  ["neon", neonTheme],
  ["vintage", vintageTheme],
  ["sakura", sakuraTheme],
];

export const APP_THEMES = Object.fromEntries(THEME_ENTRIES) as Record<
  Theme,
  AppThemeConfig
>;

export const THEME_NAMES = [...THEMES];

export const themes = APP_THEMES;
