import {
  type HTMLStyledProps,
  StyledComponent,
  styled,
} from "styled-system/jsx";

export interface SvgProps extends HTMLStyledProps<"svg"> {
  children?: React.ReactNode;
}

export interface GroupProps extends HTMLStyledProps<"g"> {
  children?: React.ReactNode;
}

export interface TextProps extends HTMLStyledProps<"text"> {
  children?: React.ReactNode;
}

export interface RectProps extends HTMLStyledProps<"rect"> {
  children?: React.ReactNode;
}

export interface PathProps extends HTMLStyledProps<"path"> {
  children?: React.ReactNode;
}

export const Svg = styled("svg");

export const Group = styled("g");

export const Text = styled("text");

export const Rect = styled("rect");

export const Path = styled("path");
