"use client";

import type { CheckboxCheckedChangeDetails } from "@ark-ui/react/checkbox";
import { Checkbox } from "@/components/core/Checkbox/Checkbox";

type SettingToggleProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (details: CheckboxCheckedChangeDetails) => void;
  /** Visually de-emphasise the label without removing it from the tab order. */
  dimmed?: boolean;
  onFocus?: () => void;
  onPointerEnter?: () => void;
};

export const SettingToggle = ({
  label,
  checked,
  onCheckedChange,
  dimmed = false,
  onFocus,
  onPointerEnter,
}: SettingToggleProps) => (
  <Checkbox.Root
    size="sm"
    checked={checked}
    onCheckedChange={onCheckedChange}
    onFocus={onFocus}
    onPointerEnter={onPointerEnter}
    display="flex"
    justifyContent="space-between"
    w="full"
    minH="9"
    px="2"
    borderRadius="l2"
    cursor="pointer"
    _hover={{ bg: "accent.primary.subtle.bg.hover" }}
    // Zag mirrors its focus data-attrs onto every part, so the ring can sit on
    // the whole row rather than the 18px control — a clearer target in a menu.
    focusVisibleRing="outside"
  >
    <Checkbox.Label opacity={dimmed ? 0.5 : 1}>{label}</Checkbox.Label>
    <Checkbox.Control focusVisibleRing="none">
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
);
