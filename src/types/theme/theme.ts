export const THEMES = ["aurora", "mono", "forest", "ocean", "ember"] as const;

export type Theme = (typeof THEMES)[number];
