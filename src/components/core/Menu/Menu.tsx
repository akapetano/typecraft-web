"use client";

import { Menu as ReactMenu, useMenuItemContext } from "@ark-ui/react/menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { type ComponentProps, forwardRef } from "react";
import { createStyleContext, type HTMLStyledProps } from "styled-system/jsx";
import { menu } from "styled-system/recipes";

const { withRootProvider, withContext } = createStyleContext(menu);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(ReactMenu.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const RootProvider = withRootProvider(ReactMenu.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
});
export const Arrow = withContext(ReactMenu.Arrow, "arrow");
export const ArrowTip = withContext(ReactMenu.ArrowTip, "arrowTip");
export const CheckboxItem = withContext(ReactMenu.CheckboxItem, "item");
export const Content = withContext(ReactMenu.Content, "content");
export const ContextTrigger = withContext(
  ReactMenu.ContextTrigger,
  "contextTrigger",
);
export const Indicator = withContext(ReactMenu.Indicator, "indicator", {
  defaultProps: { children: <ChevronDownIcon /> },
});
export const Item = withContext(ReactMenu.Item, "item");
export const ItemGroup = withContext(ReactMenu.ItemGroup, "itemGroup");
export const ItemGroupLabel = withContext(
  ReactMenu.ItemGroupLabel,
  "itemGroupLabel",
);
export const ItemText = withContext(ReactMenu.ItemText, "itemText");
export const Positioner = withContext(ReactMenu.Positioner, "positioner");
export const RadioItem = withContext(ReactMenu.RadioItem, "item");
export const RadioItemGroup = withContext(
  ReactMenu.RadioItemGroup,
  "itemGroup",
);
export const Separator = withContext(ReactMenu.Separator, "separator");
export const Trigger = withContext(ReactMenu.Trigger, "trigger");
export const TriggerItem = withContext(ReactMenu.TriggerItem, "item");

export {
  MenuContext as Context,
  type MenuSelectionDetails as SelectionDetails,
} from "@ark-ui/react/menu";

const StyledItemIndicator = withContext(
  ReactMenu.ItemIndicator,
  "itemIndicator",
);

export const ItemIndicator = forwardRef<HTMLDivElement, HTMLStyledProps<"div">>(
  function ItemIndicator(props, ref) {
    const item = useMenuItemContext();

    return item.checked ? (
      <StyledItemIndicator ref={ref} {...props}>
        <CheckIcon />
      </StyledItemIndicator>
    ) : (
      <svg aria-hidden="true" focusable="false" />
    );
  },
);

export const Menu = {
  Root,
  RootProvider,
  Arrow,
  ArrowTip,
  CheckboxItem,
  Content,
  ContextTrigger,
  Indicator,
  Item,
  ItemGroup,
};
