import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Character } from "@/components/features/TypingTest/components/Character";

describe("Character", () => {
  it("should apply correct state styling classes", () => {
    const { container } = render(<Character char="a" state="correct" />);
    const element = container.firstChild as HTMLElement;

    // Check for Panda's success color class
    expect(element.className).toContain("c_success");
  });

  it("should render space as non-breaking space", () => {
    const { container } = render(<Character char=" " state="untyped" />);
    const span = container.firstChild as HTMLElement;

    // Check actual text content (not normalized by testing-library)
    expect(span.textContent).toBe("\u00A0");
  });

  it("should detect punctuation and apply styling", () => {
    const { container } = render(<Character char="." state="untyped" />);
    const element = container.firstChild as HTMLElement;

    // Punctuation should have relaxed letter spacing
    expect(element.className).toContain("lh_relaxed");
  });

  it("should not apply punctuation styling to letters", () => {
    const { container } = render(<Character char="a" state="untyped" />);
    const element = container.firstChild as HTMLElement;

    // Letters should have relaxed spacing
    expect(element.className).toContain("lh_relaxed");
  });

  it("should render regular characters as-is", () => {
    const { container } = render(<Character char="x" state="current" />);
    const span = container.firstChild as HTMLElement;

    expect(span.textContent).toBe("x");
  });
});
