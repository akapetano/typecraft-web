import type { Theme } from "@/types/theme/theme";

export type ThemeMeta = {
  value: Theme;
  label: string;
};

export const THEME_META: Record<Theme, ThemeMeta> = {
  aurora: { value: "aurora", label: "Aurora" },
  mono: { value: "mono", label: "Mono" },
  forest: { value: "forest", label: "Forest" },
  ocean: { value: "ocean", label: "Ocean" },
  ember: { value: "ember", label: "Ember" },
  sunset: { value: "sunset", label: "Sunset" },
  neon: { value: "neon", label: "Neon" },
  vintage: { value: "vintage", label: "Vintage" },
  sakura: { value: "sakura", label: "Sakura" },
};

export const THEME_OPTIONS = Object.values(THEME_META);
