import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders with custom element via as prop", () => {
    render(<Heading as="h1">Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders h3 element", () => {
    render(<Heading as="h3">Subtitle</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("accepts children", () => {
    render(<Heading>Hello World</Heading>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("accepts size variants", () => {
    render(<Heading size="h1">Large</Heading>);
    expect(screen.getByText("Large")).toBeInTheDocument();
  });
});
