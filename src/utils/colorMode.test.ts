import { describe, it } from "vitest";

describe("getSystemColorMode", () => {
  it("returns 'dark' when prefers-color-scheme is dark", () => {
    // Mock matchMedia
  });

  it("returns 'light' when prefers-color-scheme is light", () => {});

  it("returns 'light' in SSR (no window)", () => {});
});

describe("readColorMode", () => {
  it("reads from DOM attribute first", () => {});
  it("falls back to cookie", () => {});
  it("falls back to system preference", () => {});
});
