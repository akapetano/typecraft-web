import { THEMES } from "@/types/theme/theme";
import { buildThemeMeta } from "@/utils/theme";

export const THEME_META = buildThemeMeta(THEMES);

export const THEME_OPTIONS = Object.values(THEME_META);
