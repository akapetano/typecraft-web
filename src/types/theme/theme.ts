export const THEMES = [
  "aurora",
  "mono",
  "forest",
  "ocean",
  "ember",
  "dusk",
  "neon",
  "vintage",
  "sakura",
  "koi",
] as const;

export type Theme = (typeof THEMES)[number];

export type ThemeMeta = {
  value: Theme;
  label: string;
};
