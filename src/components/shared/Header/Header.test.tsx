import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders as header element with correct role", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders Logo component", () => {
    render(<Header />);
    // Assuming Logo has a testable element or aria-label
    // Adjust based on your Logo implementation
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    // or: expect(screen.getByLabelText("Typecraft")).toBeInTheDocument();
  });
});
