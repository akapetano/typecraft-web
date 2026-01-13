import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  describe("Rendering", () => {
    it("renders as footer element with correct role", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("displays copyright with current year", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(`© ${currentYear} Typecraft`),
      ).toBeInTheDocument();
    });

    it("displays privacy policy link", () => {
      render(<Footer />);
      expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    });

    it("displays terms of service link", () => {
      render(<Footer />);
      expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    });
  });

  describe("Dynamic Content", () => {
    it("updates copyright year dynamically", () => {
      // Mock date to test year rendering
      const mockDate = new Date("2027-01-01");
      vi.setSystemTime(mockDate);

      render(<Footer />);
      expect(screen.getByText("© 2027 Typecraft")).toBeInTheDocument();

      vi.useRealTimers();
    });
  });
});
