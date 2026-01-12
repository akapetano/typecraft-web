import "vitest-axe/extend-expect";
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import ResizeObserver from "resize-observer-polyfill";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// Auto-cleanup after each test
afterEach(() => {
  cleanup();
});

// ResizeObserver mock - Essential for Ark UI
global.ResizeObserver = ResizeObserver;

// IntersectionObserver mock - Essential for Ark UI
class IntersectionObserverMock {
  constructor(
    _callback?: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}
  disconnect() {}
  observe(_target: Element) {}
  unobserve(_target: Element) {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
global.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Scroll Methods mock - Needed for Ark UI focus management
Element.prototype.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

// Scroll position mocks
Object.defineProperty(global, "scrollY", { value: 0, writable: true });
Object.defineProperty(global, "scrollX", { value: 0, writable: true });

// requestAnimationFrame mock
global.requestAnimationFrame = ((cb: FrameRequestCallback) => {
  return setTimeout(cb, 16) as unknown as number;
}) as unknown as typeof requestAnimationFrame;

// URL object mock
global.URL.createObjectURL = () => "https://i.pravatar.cc/300";
global.URL.revokeObjectURL = () => {};

// navigator mock - For clipboard testing
Object.defineProperty(global.navigator, "clipboard", {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
  writable: true,
  configurable: true,
});

// matchMedia mock - Critical for responsive Ark UI components
Object.defineProperty(global, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// PointerEvent mock - Needed for modern Ark UI interactions
if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
    }
  }
  global.PointerEvent = PointerEvent as unknown as typeof window.PointerEvent;
}

// getComputedStyle mock
global.getComputedStyle = (element: Element) => {
  return {
    getPropertyValue: () => "",
  } as unknown as CSSStyleDeclaration;
};

// Optional: Filter console noise
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    // Suppress known test environment warnings
    if (
      typeof args[0] === "string" &&
      (args[0].includes("act()") ||
        args[0].includes("Not implemented: HTMLFormElement.prototype"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
