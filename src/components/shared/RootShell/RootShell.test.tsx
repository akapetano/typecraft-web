import { describe, expect, it } from "vitest";
import { renderShell } from "@/tests/renderShell";
import { RootShell } from "./RootShell";

describe("RootShell", () => {
  it("renders html element with default lang", () => {
    renderShell(
      <RootShell colorMode="light" theme="aurora">
        <div>Content</div>
      </RootShell>,
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  it("renders with custom lang prop", () => {
    renderShell(
      <RootShell colorMode="light" theme="aurora" lang="es">
        <div>Content</div>
      </RootShell>,
    );

    expect(document.documentElement).toHaveAttribute("lang", "es");
  });

  it("applies font variable classes to html", () => {
    renderShell(
      <RootShell colorMode="light" theme="aurora">
        <div>Content</div>
      </RootShell>,
    );

    const className = document.documentElement.className;

    // Verify both font variables are present
    expect(className).toContain("--font-family-body");
    expect(className).toContain("--font-family-mono");
  });
});
