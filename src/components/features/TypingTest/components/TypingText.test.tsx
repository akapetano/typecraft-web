import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingText } from "@/components/features/TypingTest/components/TypingText";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";

describe("TypingText", () => {
  const mockGetState = (index: number): CharacterState => "untyped";

  it("should render all characters from text", () => {
    render(<TypingText text="hello world" getCharacterState={mockGetState} />);

    expect(screen.getByText("h")).toBeInTheDocument();
    expect(screen.getByText("e")).toBeInTheDocument();
    // etc.
  });

  it("should split text into words", () => {
    const { container } = render(
      <TypingText text="hello world" getCharacterState={mockGetState} />,
    );

    // Get all spans that contain word characters
    const allSpans = container.querySelectorAll('span[class*="inline"]');
    expect(allSpans.length).toBeGreaterThanOrEqual(2);
  });

  it("should preserve word boundaries", () => {
    render(<TypingText text="a b" getCharacterState={mockGetState} />);

    // Words should not be split across boundaries
    // Implementation depends on your DOM structure
  });
});
