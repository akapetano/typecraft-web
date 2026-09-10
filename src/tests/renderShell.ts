import {
  type RenderOptions,
  type RenderResult,
  render,
} from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Renders a component that emits the document shell (`<html>`/`<body>`).
 *
 * Testing Library's default container is a `<div>`, and React rejects an
 * `<html>` child there with "In HTML, <html> cannot be a child of <div>".
 * Mounting on `document` gives those elements their only legal parent. React
 * treats `<html>` and `<body>` as singletons either way, so shell props land on
 * the real `document.documentElement` and children mount into `document.body` —
 * the same result the server-rendered shell produces.
 */
export const renderShell = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "container" | "baseElement">,
): RenderResult =>
  render(ui, {
    ...options,
    // RTL types `container` as `Element`; `document` is the only valid parent
    // for `<html>`, and React's root API accepts it.
    container: document as unknown as HTMLElement,
    baseElement: document.body,
  });
