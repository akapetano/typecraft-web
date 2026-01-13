import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RootShell } from "./RootShell";

describe("RootShell", () => {
  it("renders html element with default lang", () => {
    const { container } = render(
      <RootShell>
        <div>Content</div>
      </RootShell>,
    );

    const html = container.closest("html");
    expect(html).toHaveAttribute("lang", "en");
  });

  it("renders with custom lang prop", () => {
    const { container } = render(
      <RootShell lang="es">
        <div>Content</div>
      </RootShell>,
    );

    const html = container.closest("html");
    expect(html).toHaveAttribute("lang", "es");
  });

  it("applies font variable classes to html", () => {
    const { container } = render(
      <RootShell>
        <div>Content</div>
      </RootShell>,
    );

    const html = container.closest("html");
    const className = html?.className || "";

    // Verify both font variables are present
    expect(className).toContain("--font-family-body");
    expect(className).toContain("--font-family-mono");
  });
});
