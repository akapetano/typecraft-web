import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Button, ButtonGroup } from "@/components/core/Button/Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders button with text", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i }),
      ).toBeInTheDocument();
    });

    it("renders with children", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>,
      );
      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("defaults to button type", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("can be set to submit type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("is not disabled by default", () => {
      render(<Button>Enabled</Button>);
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
  });

  describe("Loading State", () => {
    it("renders with loading state", () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("data-loading");
    });

    it("is disabled when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders with loadingText", () => {
      render(
        <Button loading loadingText="Please wait...">
          Submit
        </Button>,
      );

      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    it("shows spinner without loadingText", () => {
      render(<Button loading>Submit</Button>);

      // The original text should be hidden but present
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-loading");
    });

    it("renders custom spinner", () => {
      render(
        <Button loading spinner={<span data-testid="custom-spinner">⏳</span>}>
          Loading
        </Button>,
      );

      expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    });

    it("does not call onClick when loading", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("remains disabled when both loading and disabled are true", () => {
      render(
        <Button loading disabled>
          Loading
        </Button>,
      );

      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Variants", () => {
    it("renders with solid variant (default)", () => {
      render(<Button variant="solid">Solid</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders with surface variant", () => {
      render(<Button variant="surface">Surface</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with subtle variant", () => {
      render(<Button variant="subtle">Subtle</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with outline variant", () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with plain variant", () => {
      render(<Button variant="plain">Plain</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders with default size (md)", () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with xs size", () => {
      render(<Button size="xs">Extra Small</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with sm size", () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with lg size", () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with xl size", () => {
      render(<Button size="xl">Extra Large</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveTextContent("Button");
    });
  });

  describe("Accessibility", () => {
    it("can receive aria-label", () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(
        screen.getByRole("button", { name: "Close dialog" }),
      ).toBeInTheDocument();
    });

    it("can receive aria-describedby", () => {
      render(
        <>
          <Button aria-describedby="help-text">Submit</Button>
          <div id="help-text">This will submit the form</div>
        </>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });

    it("has proper disabled state for screen readers", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("disabled");
    });
  });
});

describe("ButtonGroup", () => {
  it("renders button group with multiple buttons", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Second" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Third" })).toBeInTheDocument();
  });

  it("forwards ref to group container", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <ButtonGroup ref={ref}>
        <Button>Button</Button>
      </ButtonGroup>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies variant to all buttons in group via context", () => {
    render(
      <ButtonGroup variant="outline">
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>,
    );

    // Both buttons should be rendered (the variant is applied via context)
    expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Second" })).toBeInTheDocument();
  });
});
