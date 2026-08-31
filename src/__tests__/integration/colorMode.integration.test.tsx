import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";

/**
 * Only the non-interactive test renders `RootShell`.
 *
 * `RootShell` emits a real `<html><body>` shell, which Testing Library mounts
 * inside a container `<div>`. Any pointer interaction in that nested-document
 * tree sends Ark's Popover positioning into an unterminated ancestor walk — a
 * synchronous loop that hangs the run outright (no test timeout can break it,
 * since the JS thread never yields). The interactive tests therefore render
 * `AppLayout` directly and set the shell's attribute themselves, which is what
 * the server-rendered `<html>` would have provided.
 */
describe("Color Mode Integration", () => {
  beforeEach(() => {
    // Clear any existing color mode settings
    document.documentElement.removeAttribute("data-color-mode");
    // biome-ignore lint/suspicious/noDocumentCookie: test setup
    document.cookie =
      "color-mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  it("renders with provided color mode", () => {
    render(
      <RootShell colorMode="dark" theme="aurora">
        <AppLayout colorMode="dark">
          <div>Test Content</div>
        </AppLayout>
      </RootShell>,
    );

    const html = document.documentElement;
    expect(html).toHaveAttribute("data-color-mode", "dark");
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("toggles color mode across components", async () => {
    const user = userEvent.setup();

    // Stand in for the server-rendered shell (see the note above the suite).
    document.documentElement.setAttribute("data-color-mode", "light");

    render(
      <AppLayout colorMode="light">
        <div>Test Content</div>
      </AppLayout>,
    );

    // Initially light mode
    expect(document.documentElement).toHaveAttribute(
      "data-color-mode",
      "light",
    );

    // Find and click the color mode button
    const button = screen.getByRole("button", { name: /color mode switcher/i });
    await user.click(button);

    // Should switch to dark mode
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        "data-color-mode",
        "dark",
      );
    });
  });

  it("persists color mode in cookie after toggle", async () => {
    const user = userEvent.setup();

    render(
      <AppLayout colorMode="light">
        <div>Test Content</div>
      </AppLayout>,
    );

    const button = screen.getByRole("button", { name: /color mode switcher/i });
    await user.click(button);

    await waitFor(() => {
      // Check cookie was set
      expect(document.cookie).toContain("color-mode=dark");
    });
  });

  it("syncs color mode across multiple button instances", async () => {
    const user = userEvent.setup();

    render(
      <AppLayout colorMode="light">
        <div>Test Content</div>
      </AppLayout>,
    );

    // Get all color mode buttons (header has one)
    const buttons = screen.getAllByRole("button", {
      name: /color mode switcher/i,
    });

    // Click first button
    await user.click(buttons[0]);

    // All buttons should update
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        "data-color-mode",
        "dark",
      );
    });
  });
});
