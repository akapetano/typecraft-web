import { type HTMLStyledProps, styled } from "styled-system/jsx";

export interface SpanProps extends HTMLStyledProps<"span"> {
  children?: React.ReactNode;
}

export const Span = styled("span");
