"use client";

import { ark } from "@ark-ui/react/factory";
import { Popover as ArkPopover, PopoverContext } from "@ark-ui/react/popover";
import type { ComponentProps } from "react";
import { createStyleContext } from "styled-system/jsx";
import { popover } from "styled-system/recipes";

const { withRootProvider, withContext } = createStyleContext(popover);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(ArkPopover.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const RootProvider = withRootProvider(ArkPopover.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const Anchor = withContext(ArkPopover.Anchor, "anchor");
export const ArrowTip = withContext(ArkPopover.ArrowTip, "arrowTip");
export const Arrow = withContext(ArkPopover.Arrow, "arrow", {
  defaultProps: { children: <ArrowTip /> },
});
export const CloseTrigger = withContext(
  ArkPopover.CloseTrigger,
  "closeTrigger",
);
export const Content = withContext(ArkPopover.Content, "content");
export const Description = withContext(ArkPopover.Description, "description");
export const Indicator = withContext(ArkPopover.Indicator, "indicator");
export const Positioner = withContext(ArkPopover.Positioner, "positioner");
export const Title = withContext(ArkPopover.Title, "title");
export const Trigger = withContext(ArkPopover.Trigger, "trigger");
export const Body = withContext(ark.div, "body");
export const Header = withContext(ark.div, "header");
export const Footer = withContext(ark.div, "footer");

export const Context = PopoverContext;

export const Popover = {
  Root,
  RootProvider,
  Anchor,
  Arrow,
  ArrowTip,
  CloseTrigger,
  Content,
  Description,
  Indicator,
  Positioner,
  Title,
  Trigger,
  Body,
  Header,
  Footer,
  Context,
};
