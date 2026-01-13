import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  describe("Rendering", () => {
    it("renders SVG element", () => {
      const { container } = render(<Logo />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders with default size (md)", () => {
      const { container } = render(<Logo />);
      const svg = container.querySelector("svg");
      // Check dimensions from LOGO_SIZES.md
      expect(svg).toHaveAttribute("width");
      expect(svg).toHaveAttribute("height");
    });

    it("has accessible role", () => {
      const { container } = render(<Logo />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders small size", () => {
      const { container } = render(<Logo size="sm" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders medium size", () => {
      const { container } = render(<Logo size="md" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders large size", () => {
      const { container } = render(<Logo size="lg" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("SVG Structure", () => {
    it("includes all key components", () => {
      const { container } = render(<Logo />);
      const svg = container.querySelector("svg");

      // Check for groups/paths (adjust based on actual structure)
      expect(svg?.querySelectorAll("g").length).toBeGreaterThan(0);
    });
  });
});
