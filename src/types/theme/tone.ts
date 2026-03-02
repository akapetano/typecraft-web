export const TONES = ["primary", "secondary", "tertiary"] as const;

export type Tone = (typeof TONES)[number];
