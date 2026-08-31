"use client";

import { ark } from "@ark-ui/react/factory";
import {
  Slider as ArkSlider,
  SliderContext,
  useSliderContext,
} from "@ark-ui/react/slider";
import { type ComponentProps, forwardRef } from "react";
import { createStyleContext } from "styled-system/jsx";
import { slider } from "styled-system/recipes";

const { withProvider, withContext } = createStyleContext(slider);

export const Root = withProvider(ArkSlider.Root, "root");
export const Control = withContext(ArkSlider.Control, "control");
export const DraggingIndicator = withContext(
  ArkSlider.DraggingIndicator,
  "draggingIndicator",
);
export const Label = withContext(ArkSlider.Label, "label");
export const Marker = withContext(ArkSlider.Marker, "marker");
export const MarkerIndicator = withContext(ark.div, "markerIndicator");
export const MarkerGroup = withContext(ArkSlider.MarkerGroup, "markerGroup");
export const Range = withContext(ArkSlider.Range, "range");
export const Thumb = withContext(ArkSlider.Thumb, "thumb");
export const Track = withContext(ArkSlider.Track, "track");
export const ValueText = withContext(ArkSlider.ValueText, "valueText");
export const HiddenInput = ArkSlider.HiddenInput;
export const Context = SliderContext;

export type RootProps = ComponentProps<typeof Root>;
export type MarkerGroupProps = ComponentProps<typeof MarkerGroup>;
export type ThumbProps = ComponentProps<typeof Thumb>;

export interface MarksProps extends MarkerGroupProps {
  marks?: Array<number | { value: number; label: React.ReactNode }> | undefined;
}

export const Marks = forwardRef<HTMLDivElement, MarksProps>(
  function Marks(props, ref) {
    const { marks, ...rest } = props;
    if (!marks?.length) return null;

    return (
      <MarkerGroup ref={ref} {...rest}>
        {marks.map((mark) => {
          const value = typeof mark === "number" ? mark : mark.value;
          const label = typeof mark === "number" ? undefined : mark.label;
          return (
            <Marker key={value} value={value}>
              <MarkerIndicator />
              {label != null && <span>{label}</span>}
            </Marker>
          );
        })}
      </MarkerGroup>
    );
  },
);

export const Thumbs = (props: Omit<ThumbProps, "index">) => {
  const slider = useSliderContext();
  return slider.value.map((_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional; Ark identifies each thumb by its index
    <Thumb key={index} index={index} {...props}>
      <HiddenInput />
    </Thumb>
  ));
};

export const Slider = {
  Root,
  Control,
  DraggingIndicator,
  Label,
  Marker,
  MarkerIndicator,
  MarkerGroup,
  Range,
  Thumb,
  Track,
  ValueText,
  HiddenInput,
  Context,
  Marks,
  Thumbs,
};
