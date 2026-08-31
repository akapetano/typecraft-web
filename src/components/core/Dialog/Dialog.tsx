"use client";

import {
  Dialog as ArkDialog,
  DialogContext,
  useDialogContext,
} from "@ark-ui/react/dialog";
import { ark } from "@ark-ui/react/factory";
import { type ComponentProps, forwardRef } from "react";
import { createStyleContext, styled } from "styled-system/jsx";
import { dialog } from "styled-system/recipes";

const { withRootProvider, withContext } = createStyleContext(dialog);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(ArkDialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const RootProvider = withRootProvider(ArkDialog.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const Backdrop = withContext(ArkDialog.Backdrop, "backdrop");
export const CloseTrigger = withContext(ArkDialog.CloseTrigger, "closeTrigger");
export const Content = withContext(ArkDialog.Content, "content");
export const Description = withContext(ArkDialog.Description, "description");
export const Positioner = withContext(ArkDialog.Positioner, "positioner");
export const Title = withContext(ArkDialog.Title, "title");
export const Trigger = withContext(ArkDialog.Trigger, "trigger");
export const Body = withContext(ark.div, "body");
export const Header = withContext(ark.div, "header");
export const Footer = withContext(ark.div, "footer");

const StyledButton = styled(ark.button);

export const ActionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof StyledButton>
>(function ActionTrigger(props, ref) {
  const dialog = useDialogContext();
  return (
    <StyledButton {...props} ref={ref} onClick={() => dialog.setOpen(false)} />
  );
});

export const Context = DialogContext;

export const Dialog = {
  Root,
  RootProvider,
  Backdrop,
  CloseTrigger,
  Content,
  Description,
  Positioner,
  Title,
  Trigger,
  Body,
  Header,
  Footer,
  ActionTrigger,
  Context,
};
