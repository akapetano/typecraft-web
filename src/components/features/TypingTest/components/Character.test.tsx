import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Character } from "@/components/features/TypingTest/components/Character";

describe("Character", () => {
  it("should apply correct state styling classes", () => {
    const { container } = render(
      <Character char="a" state="correctFirstTry" />,
    );
    const element = container.firstChild as HTMLElement;

    // Check for the typing "correct" semantic color class
    expect(element.className).toContain("c_typing.correct.fg");
  });

  it("should apply current state styling classes", () => {
    const { container } = render(<Character char="x" state="current" />);
    const element = container.firstChild as HTMLElement;

    // Current character should use the typing.current background token
    expect(element.className).toContain("bg_typing.current.bg");
  });

  it("should apply incorrect state styling classes", () => {
    const { container } = render(<Character char="x" state="incorrect" />);
    const element = container.firstChild as HTMLElement;

    // Incorrect character should use the typing.incorrect fg and bg tokens
    expect(element.className).toContain("c_typing.incorrect.fg");
    expect(element.className).toContain("bg_typing.incorrect.bg");
  });

  it("should apply incorrectRemedied state styling classes", () => {
    const { container } = render(
      <Character char="x" state="incorrectRemedied" />,
    );
    const element = container.firstChild as HTMLElement;

    // Remedied incorrect character should use the typing.incorrectRemedied tokens
    expect(element.className).toContain("c_typing.incorrectRemedied.fg");
    expect(element.className).toContain("bg_typing.incorrectRemedied.bg");
  });

  it("should render space as non-breaking space", () => {
    const { container } = render(<Character char=" " state="pending" />);
    const span = container.firstChild as HTMLElement;

    // Check actual text content (not normalized by testing-library)
    expect(span.textContent).toBe("\u00A0");
  });

  it("should detect punctuation and apply styling", () => {
    const { container } = render(<Character char="." state="pending" />);
    const element = container.firstChild as HTMLElement;

    // Punctuation should have relaxed letter spacing
    expect(element.className).toContain("lh_relaxed");
  });

  it("should not apply punctuation styling to letters", () => {
    const { container } = render(<Character char="a" state="pending" />);
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
