import type { Theme } from "@/types/theme/theme";
import { THEMES } from "@/types/theme/theme";

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && THEMES.includes(value as Theme);

export const setTheme = (theme: Theme) => {
  if (typeof window !== "undefined") return;

  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};
