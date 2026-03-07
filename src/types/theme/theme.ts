export const THEMES = [
  "aurora",
  "mono",
  "forest",
  "ocean",
  "ember",
  "dusk",
  "neon",
  "sakura",
  "vintage",
] as const;

export type Theme = (typeof THEMES)[number];

export type ThemeMeta = {
  value: Theme;
  label: string;
};
