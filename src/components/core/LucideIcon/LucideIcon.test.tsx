// LucideIcon.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LucideIcon } from "./LucideIcon";

describe("LucideIcon", () => {
  describe("Valid Icons", () => {
    it("renders a valid lucide icon", () => {
      render(<LucideIcon name="Check" data-testid="icon" />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders Heart icon", () => {
      const { container } = render(<LucideIcon name="Heart" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("forwards props to icon", () => {
      render(
        <LucideIcon name="Star" size={32} color="red" data-testid="star" />,
      );
      const icon = screen.getByTestId("star");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
    });

    it("applies stroke-width prop", () => {
      render(<LucideIcon name="Circle" strokeWidth={3} data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("stroke-width", "3");
    });
  });

  describe("Invalid Icons", () => {
    it("returns null for invalid icon name", () => {
      const { container } = render(<LucideIcon name={"InvalidIcon" as any} />);
      expect(container.firstChild).toBeNull();
    });

    it("logs error in development for invalid icon", () => {
      vi.stubEnv("NODE_ENV", "development");
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<LucideIcon name={"FakeIcon" as any} />);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Icon "FakeIcon" not found'),
      );

      consoleSpy.mockRestore();
      vi.unstubAllEnvs();
    });

    it("does not log in production for invalid icon", () => {
      vi.stubEnv("NODE_ENV", "production");
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<LucideIcon name={"FakeIcon" as any} />);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
      vi.unstubAllEnvs();
    });
  });

  describe("Common Icons", () => {
    const commonIcons = [
      "Menu",
      "X",
      "ChevronDown",
      "Search",
      "User",
      "Settings",
    ] as const;

    it.each(commonIcons)("renders %s icon", (iconName) => {
      const { container } = render(<LucideIcon name={iconName} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});
