import { beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_ATTRIBUTE_NAME, THEME_COOKIE_NAME } from "@/constants/theme";
import { THEMES } from "@/types/theme/theme";
import { isTheme, readTheme, setTheme } from "@/utils/theme";

function clearThemeStorage() {
  document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
  document.documentElement.removeAttribute("data-panda-theme");
  // biome-ignore lint/suspicious/noDocumentCookie: test setup for isolation
  document.cookie = `${THEME_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

describe("isTheme", () => {
  it("returns true for valid theme strings", () => {
    expect(isTheme("aurora")).toBe(true);
    expect(isTheme("mono")).toBe(true);
  });

  it("returns false for invalid strings", () => {
    expect(isTheme("")).toBe(false);
    expect(isTheme("light")).toBe(false);
    expect(isTheme("dark")).toBe(false);
  });

  it("returns false for non-strings", () => {
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme(0)).toBe(false);
    expect(isTheme({})).toBe(false);
  });
});

describe("readTheme", () => {
  beforeEach(() => {
    clearThemeStorage();
  });

  it("returns document attribute when data-theme is set and valid", () => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, "mono");
    expect(readTheme()).toBe("mono");
  });

  it("falls back to cookie when no attribute", () => {
    // biome-ignore lint/suspicious/noDocumentCookie: test setup
    document.cookie = `${THEME_COOKIE_NAME}=mono; path=/`;
    expect(readTheme()).toBe("mono");
  });

  it("falls back to default theme when no cookie or attribute", () => {
    expect(readTheme()).toBe(THEMES[0]);
  });

  it("falls back to cookie when attribute is invalid", () => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, "invalid");
    // biome-ignore lint/suspicious/noDocumentCookie: test setup
    document.cookie = `${THEME_COOKIE_NAME}=aurora; path=/`;
    expect(readTheme()).toBe("aurora");
  });

  it("falls back to default when cookie and attribute are invalid", () => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, "invalid");
    // biome-ignore lint/suspicious/noDocumentCookie: test setup
    document.cookie = `${THEME_COOKIE_NAME}=invalid; path=/`;
    expect(readTheme()).toBe(THEMES[0]);
  });
});

describe("setTheme", () => {
  beforeEach(() => {
    clearThemeStorage();
  });

  it("sets cookie, data-theme, and data-panda-theme", () => {
    setTheme("mono");

    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME)).toBe(
      "mono",
    );
    expect(document.documentElement.dataset.pandaTheme).toBe("mono");
    expect(document.cookie).toContain(`${THEME_COOKIE_NAME}=mono`);
  });

  it("is a no-op when window is undefined", () => {
    const originalWindow = globalThis.window;
    vi.stubGlobal("window", undefined);

    setTheme("mono");

    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME)).toBe(
      null,
    );
    expect(document.documentElement.dataset.pandaTheme).not.toBe("mono");
    expect(document.cookie).not.toContain(`${THEME_COOKIE_NAME}=mono`);

    vi.stubGlobal("window", originalWindow);
  });
});
