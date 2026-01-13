import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as p by default", () => {
    render(<Text>Content</Text>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with custom element via as prop", () => {
    render(<Text as="span">Inline text</Text>);
    const text = screen.getByText("Inline text");
    expect(text.tagName.toLowerCase()).toBe("span");
  });

  it("accepts variant props", () => {
    render(<Text fontSize="lg">Large text</Text>);
    expect(screen.getByText("Large text")).toBeInTheDocument();
  });
});
