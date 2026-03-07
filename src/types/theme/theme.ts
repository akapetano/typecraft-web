export const THEMES = ["aurora", "mono", "forest", "ocean"] as const;

export type Theme = (typeof THEMES)[number];
