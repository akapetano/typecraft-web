import { styled } from "styled-system/jsx";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";
import { Span } from "@/components/core/Span/Span";

const OverlayButton = styled("button");

interface PausedOverlayProps {
  /** Resume the test (also triggered globally by any key press while paused). */
  onResume: () => void;
}

/**
 * Scrim shown over the typing area when a test auto-pauses on tab/window focus
 * loss (TYP-15). Rendered as a real `button` so it is focusable and responds to
 * click / Enter / Space; the engine additionally resumes on any key press.
 */
export function PausedOverlay({ onResume }: PausedOverlayProps) {
  return (
    <OverlayButton
      type="button"
      onClick={onResume}
      // Focus recovery is disabled while paused, but keep this control exempt so
      // a click here is always treated as intentional.
      data-focus-exempt
      aria-label="Paused. Resume typing test"
      position="absolute"
      inset="0"
      zIndex="overlay"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="2"
      cursor="pointer"
      borderRadius="inherit"
      backgroundColor="bg.default/80"
      blur="3xl"
      color="fg.default"
      focusVisibleRing="outside"
    >
      <Icon h="8" w="8" color="accent.secondary.solid.bg">
        <LucideIcon name="Pause" />
      </Icon>
      <Span fontSize="lg" fontWeight="bold" color="accent.secondary.solid.bg">
        Paused
      </Span>
      <Span fontSize="sm" fontWeight="medium" color="fg.default">
        Click or press any key to resume
      </Span>
    </OverlayButton>
  );
}
