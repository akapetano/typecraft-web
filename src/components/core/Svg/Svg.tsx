import { type HTMLStyledProps, styled } from "styled-system/jsx";

export interface SvgProps extends HTMLStyledProps<"svg"> {
  children?: React.ReactNode;
}

export const Svg = styled("svg");
