import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsBar } from "@/components/features/TypingTest/components/StatsBar";

describe("StatsBar", () => {
  it("should display WPM stat", () => {
    render(<StatsBar wpm={45} accuracy={95} timeElapsed={30} />);
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("WPM")).toBeInTheDocument();
  });

  it("should display accuracy as percentage", () => {
    render(<StatsBar wpm={45} accuracy={95} timeElapsed={30} />);
    expect(screen.getByText("95%")).toBeInTheDocument();
  });

  it("should display time with seconds unit", () => {
    render(<StatsBar wpm={45} accuracy={95} timeElapsed={30} />);
    expect(screen.getByText("30s")).toBeInTheDocument();
  });

  it("should format large numbers correctly", () => {
    render(<StatsBar wpm={123} accuracy={100} timeElapsed={999} />);
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("999s")).toBeInTheDocument();
  });
});
