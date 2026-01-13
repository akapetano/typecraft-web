import { describe, it } from "vitest";

describe("useColorMode", () => {
  it("initializes with system preference when no cookie", () => {
    // Mock matchMedia to return dark
    // Verify colorMode is "dark"
  });

  it("prioritizes cookie over system preference", () => {
    // Set cookie to "light"
    // Mock system preference as "dark"
    // Verify colorMode is "light"
  });

  it("toggles color mode and updates cookie + DOM", () => {
    // Toggle from light to dark
    // Verify cookie is set
    // Verify data-color-mode attribute updated
  });

  it("dispatches custom event on toggle", () => {
    // Listen for COLOR_MODE_EVENT
    // Toggle
    // Verify event was fired with correct detail
  });

  it("syncs across components via custom events", () => {
    // Render two components using useColorMode
    // Toggle in one
    // Verify both update
  });
});
