import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";
import { THEME_ATTRIBUTE_NAME, THEME_COOKIE_NAME } from "@/constants/theme";

function clearThemeStorage() {
  document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);
  document.documentElement.removeAttribute("data-panda-theme");
  // biome-ignore lint/suspicious/noDocumentCookie: test setup
  document.cookie = `${THEME_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Only the non-interactive test renders `RootShell`.
 *
 * `RootShell` emits a real `<html><body>` shell, which Testing Library mounts
 * inside a container `<div>`. Any pointer interaction in that nested-document
 * tree sends Ark's Popover positioning into an unterminated ancestor walk — a
 * synchronous loop that hangs the run outright (no test timeout can break it,
 * since the JS thread never yields). The interactive tests therefore render
 * `AppLayout` directly; `setTheme` writes to the real `documentElement`, so
 * every assertion below still targets what production would set.
 */
describe("Theme Integration", () => {
  beforeEach(() => {
    clearThemeStorage();
  });

  it("renders with provided theme", () => {
    render(
      <RootShell colorMode="light" theme="mono">
        <AppLayout colorMode="light" theme="mono">
          <div>Test Content</div>
        </AppLayout>
      </RootShell>,
    );

    // RootShell passes theme to AppLayout; theme switcher and content render
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(
      document.querySelector("[data-panda-theme='mono']"),
    ).toBeInTheDocument();
  });

  it("switches theme when user selects option from menu", async () => {
    const user = userEvent.setup();

    render(
      <AppLayout colorMode="light" theme="aurora">
        <div>Test Content</div>
      </AppLayout>,
    );

    const trigger = screen.getByRole("button", { name: /theme switcher/i });
    await user.click(trigger);

    const monoOption = await screen.findByRole("menuitemradio", {
      name: /mono/i,
    });
    await user.click(monoOption);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        THEME_ATTRIBUTE_NAME,
        "mono",
      );
      expect(document.documentElement).toHaveAttribute(
        "data-panda-theme",
        "mono",
      );
    });
  });

  it("persists theme in cookie after switch", async () => {
    const user = userEvent.setup();

    render(
      <AppLayout colorMode="light" theme="aurora">
        <div>Test Content</div>
      </AppLayout>,
    );

    const trigger = screen.getByRole("button", { name: /theme switcher/i });
    await user.click(trigger);

    const monoOption = await screen.findByRole("menuitemradio", {
      name: /mono/i,
    });
    await user.click(monoOption);

    await waitFor(() => {
      expect(document.cookie).toContain(`${THEME_COOKIE_NAME}=mono`);
    });
  });
});
