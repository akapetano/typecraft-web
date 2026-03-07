export const THEMES = ["aurora", "mono", "forest"] as const;

export type Theme = (typeof THEMES)[number];
