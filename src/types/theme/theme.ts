export const THEMES = ["aurora", "mono"] as const;

export type Theme = (typeof THEMES)[number];
