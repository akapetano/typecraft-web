export const THEMES = [
  "aurora",
  "mono",
  "forest",
  "ocean",
  "ember",
  "sunset",
  "neon",
  "sakura",
  "vintage",
] as const;

export type Theme = (typeof THEMES)[number];
