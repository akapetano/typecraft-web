import type { Theme } from "@/types/theme/theme";

export type ThemeMeta = {
  value: Theme;
  label: string;
  marbleBackgroundImage: string;
};

export const THEME_META: Record<Theme, ThemeMeta> = {
  aurora: {
    value: "aurora",
    label: "Aurora",
    marbleBackgroundImage: `
      radial-gradient(circle at 28% 50%, var(--colors-mint-9) 0%, transparent 100%),
      radial-gradient(circle at 62% 32%, var(--colors-iris-9) 0%, transparent 100%),
      radial-gradient(circle at 52% 76%, var(--colors-sky-9) 0%, transparent 100%),
      linear-gradient(
        135deg,
        var(--colors-mint-4),
        var(--colors-iris-4),
        var(--colors-sky-4)
      )
    `,
  },
  mono: {
    value: "mono",
    label: "Mono",
    marbleBackgroundImage: `
      linear-gradient(
        220deg,
        var(--colors-gray-12),
        var(--colors-gray-2)
      )
    `,
  },
};

export const THEME_OPTIONS = Object.values(THEME_META);
