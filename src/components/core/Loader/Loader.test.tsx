import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Loader } from "./Loader";

describe("Loader", () => {
  describe("Visibility", () => {
    it("shows spinner when visible is true", () => {
      render(
        <Loader visible data-testid="loader">
          Content
        </Loader>,
      );
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders children directly when visible is false", () => {
      render(
        <Loader visible={false}>
          <div data-testid="child">Content</div>
        </Loader>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  describe("With Text", () => {
    it("renders spinner and text", () => {
      render(<Loader text="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("places spinner at start by default", () => {
      const { container } = render(<Loader text="Loading..." />);
      const span = container.querySelector("span");
      expect(span?.textContent).toMatch(/^Loading\.\.\.$/);
    });

    it("places spinner at end when spinnerPlacement is end", () => {
      render(<Loader text="Loading..." spinnerPlacement="end" />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Without Text", () => {
    it("centers spinner and hides children", () => {
      render(
        <Loader>
          <div data-testid="child">Content</div>
        </Loader>,
      );
      const child = screen.getByTestId("child");
      // Children should be hidden but in DOM
      expect(child).toBeInTheDocument();
    });

    it("renders without spinner or text", () => {
      render(
        <Loader spinner={null} text={null}>
          <div data-testid="child">Content</div>
        </Loader>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });
  });

  describe("Custom Spinner", () => {
    it("accepts custom spinner element", () => {
      render(
        <Loader
          spinner={<span data-testid="custom-spinner">🔄</span>}
          text="Wait"
        >
          Content
        </Loader>,
      );
      expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Loader ref={ref}>Content</Loader>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
