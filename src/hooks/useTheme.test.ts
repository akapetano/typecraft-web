import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  THEME_EVENT,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { THEMES } from "@/types/theme/theme";

function clearThemeStorage() {
  document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
  document.documentElement.removeAttribute("data-panda-theme");
  // Test setup: clear theme cookie
  // biome-ignore lint/suspicious/noDocumentCookie: intentional cookie clear for test isolation
  document.cookie = `${THEME_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

describe("useTheme", () => {
  beforeEach(() => {
    clearThemeStorage();
  });

  it("initializes with default theme when no cookie or attribute", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe(THEMES[0]);
  });

  it("prioritizes cookie over default", () => {
    // biome-ignore lint/suspicious/noDocumentCookie: test setup to simulate saved theme cookie
    document.cookie = `${THEME_COOKIE_NAME}=mono; path=/`;
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("mono");
  });

  it("prioritizes document attribute over cookie", () => {
    // biome-ignore lint/suspicious/noDocumentCookie: test setup to simulate cookie vs attribute priority
    document.cookie = `${THEME_COOKIE_NAME}=mono; path=/`;
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, "aurora");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("aurora");
  });

  it("handleThemeChange updates state, cookie, DOM, and dispatches event", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe(THEMES[0]);

    let eventDetail: string | undefined;
    const listener = (e: Event) => {
      eventDetail = (e as CustomEvent<string>).detail;
    };
    window.addEventListener(THEME_EVENT, listener);

    act(() => {
      result.current.handleThemeChange("mono");
    });

    expect(result.current.theme).toBe("mono");
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE_NAME)).toBe(
      "mono",
    );
    expect(document.documentElement.dataset.pandaTheme).toBe("mono");
    expect(document.cookie).toContain(`${THEME_COOKIE_NAME}=mono`);
    expect(eventDetail).toBe("mono");

    window.removeEventListener(THEME_EVENT, listener);
  });

  it("syncs with externalTheme prop", () => {
    const { result, rerender } = renderHook(
      ({ externalTheme }: { externalTheme?: (typeof THEMES)[number] }) =>
        useTheme(externalTheme),
      { initialProps: { externalTheme: "mono" } },
    );
    expect(result.current.theme).toBe("mono");

    rerender({ externalTheme: "aurora" });
    expect(result.current.theme).toBe("aurora");
  });

  it("syncs across components via custom event", () => {
    const { result: resultA } = renderHook(() => useTheme());
    const { result: resultB } = renderHook(() => useTheme());

    expect(resultA.current.theme).toBe(THEMES[0]);
    expect(resultB.current.theme).toBe(THEMES[0]);

    act(() => {
      resultA.current.handleThemeChange("mono");
    });

    expect(resultA.current.theme).toBe("mono");
    expect(resultB.current.theme).toBe("mono");
  });
});
