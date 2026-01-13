import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppLayout } from "./AppLayout";

describe("AppLayout", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(
        <AppLayout>
          <div>Page Content</div>
        </AppLayout>,
      );
      expect(screen.getByText("Page Content")).toBeInTheDocument();
    });

    it("renders with header and footer by default", () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>,
      );

      expect(screen.getByRole("banner")).toBeInTheDocument(); // <header>
      expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // <footer>
    });

    it("renders main element for content", () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>,
      );

      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering", () => {
    it("hides header when showHeader is false", () => {
      render(
        <AppLayout showHeader={false}>
          <div>Content</div>
        </AppLayout>,
      );

      expect(screen.queryByRole("banner")).not.toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("hides footer when showFooter is false", () => {
      render(
        <AppLayout showFooter={false}>
          <div>Content</div>
        </AppLayout>,
      );

      expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("hides both header and footer when both flags are false", () => {
      render(
        <AppLayout showHeader={false} showFooter={false}>
          <div>Content</div>
        </AppLayout>,
      );

      expect(screen.queryByRole("banner")).not.toBeInTheDocument();
      expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>,
      );

      // Verify proper landmark structure
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });
});
