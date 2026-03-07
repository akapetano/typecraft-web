import { THEME_ATTRIBUTE_NAME, THEME_COOKIE_NAME } from "@/constants/theme";
import { Time } from "@/constants/time";
import type { Theme, ThemeMeta } from "@/types/theme/theme";
import { THEMES } from "@/types/theme/theme";
import { getCookie, setCookie } from "@/utils/cookies";

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && THEMES.includes(value as Theme);

export function readTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME);
    if (attr && isTheme(attr)) return attr;
  }

  const cookie = getCookie(THEME_COOKIE_NAME);
  if (cookie && isTheme(cookie)) return cookie;

  return THEMES[0];
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  setCookie(THEME_COOKIE_NAME, theme, Time.YEARS_1);
  document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, theme);
  document.documentElement.dataset.pandaTheme = theme;
}

export function themeToLabel(theme: Theme): string {
  return theme.charAt(0).toUpperCase() + theme.slice(1);
}

export function buildThemeMeta(
  themes: readonly Theme[],
): Record<Theme, ThemeMeta> {
  return Object.fromEntries(
    themes.map((value) => [value, { value, label: themeToLabel(value) }]),
  ) as Record<Theme, ThemeMeta>;
}
