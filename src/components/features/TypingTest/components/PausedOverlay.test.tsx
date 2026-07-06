import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PausedOverlay } from "@/components/features/TypingTest/components/PausedOverlay";

describe("PausedOverlay", () => {
  it("renders the paused state and resume hint", () => {
    render(<PausedOverlay onResume={vi.fn()} />);
    expect(screen.getByText("Paused")).toBeInTheDocument();
    expect(
      screen.getByText("Click or press any key to resume"),
    ).toBeInTheDocument();
  });

  it("is an accessible button labelled for resume", () => {
    render(<PausedOverlay onResume={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Paused. Resume typing test" }),
    ).toBeInTheDocument();
  });

  it("calls onResume when clicked", () => {
    const onResume = vi.fn();
    render(<PausedOverlay onResume={onResume} />);

    screen.getByRole("button").click();
    expect(onResume).toHaveBeenCalledTimes(1);
  });
});
