export const APP_NAME = "Typecraft";
export const APP_DESCRIPTION = "Typecraft is a platform for typing practice";
export const APP_URL = "https://typecraft.tech";

export const ICONS = {
  icon: [
    { url: "/icon.svg", type: "image/svg+xml" as const },
    {
      url: "/icon-dark.svg",
      type: "image/svg+xml" as const,
      media: "(prefers-color-scheme: dark)" as const,
    },
    {
      url: "/icons/icon-32x32.png",
      sizes: "32x32" as const,
      type: "image/png" as const,
    },
    {
      url: "/icons/icon-16x16.png",
      sizes: "16x16" as const,
      type: "image/png" as const,
    },
  ],
  apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" as const }],
  other: [
    {
      rel: "icon" as const,
      url: "/icons/android-chrome-192x192.png",
      sizes: "192x192" as const,
      type: "image/png" as const,
    },
    {
      rel: "icon" as const,
      url: "/icons/android-chrome-512x512.png",
      sizes: "512x512" as const,
      type: "image/png" as const,
    },
  ],
};
