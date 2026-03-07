export const THEMES = [
  "aurora",
  "mono",
  "forest",
  "ocean",
  "ember",
  "sunset",
] as const;

export type Theme = (typeof THEMES)[number];
