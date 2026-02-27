import { Fragment, type HTMLAttributes } from "react";
import { css, cx } from "styled-system/css";
import { styled } from "styled-system/jsx";
import { token } from "styled-system/tokens";

export type KeyRootProps = HTMLAttributes<SVGElement> & {
  width?: number;
  height?: number;
};

export type WordmarkProps = HTMLAttributes<SVGTextElement>;

export type KeyProps = HTMLAttributes<SVGGElement>;

export const KeyRoot = ({
  width = 340,
  height = 90,
  children,
  ...props
}: KeyRootProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 90"
      fill="none"
      role="img"
      aria-label="Typecraft"
      {...props}
    >
      {children}
      <Gradients />
    </svg>
  );
};

export const Gradients = () => {
  return (
    <defs>
      <linearGradient
        id="baseGradient"
        x1="10"
        y1="8"
        x2="78"
        y2="76"
        gradientUnits="userSpaceOnUse"
      >
        <styled.stop
          stopColor={{
            base: token("colors.accent.secondary.8"),
            _dark: token("colors.accent.secondary.3"),
          }}
        />
        <styled.stop
          offset="1"
          stopColor={{
            base: token("colors.accent.secondary.12"),
            _dark: token("colors.accent.secondary.7"),
          }}
        />
      </linearGradient>

      <linearGradient
        id="faceGradient"
        x1="16"
        y1="14"
        x2="72"
        y2="70"
        gradientUnits="userSpaceOnUse"
      >
        <styled.stop
          stopColor={{
            base: token("colors.accent.primary.7"),
            _dark: token("colors.accent.primary.12"),
          }}
        />
        <styled.stop
          offset="1"
          stopColor={{
            base: token("colors.accent.primary.4"),
            _dark: token("colors.accent.primary.9"),
          }}
        />
      </linearGradient>
    </defs>
  );
};

export const Key = ({ className, children, ...props }: KeyProps) => {
  return (
    <g className={cx("key", className)} {...props}>
      {children}
    </g>
  );
};

export const KeyShadow = () => {
  return (
    <rect
      x="10"
      y="14"
      width="68"
      height="70"
      rx="16"
      fill={token("colors.gray.12")}
      opacity="0.15"
    />
  );
};

export const KeyBase = () => {
  return (
    <rect
      x="10"
      y="8"
      width="68"
      height="68"
      rx="16"
      fill="url(#baseGradient)"
    />
  );
};

export const KeyFace = () => {
  return (
    <rect
      x="16"
      y="6"
      width="56"
      height="56"
      rx="12"
      fill="url(#faceGradient)"
    />
  );
};

export const KeyHighlight = () => {
  return (
    <path
      d="M17 22C19 16 20 11 30 11H58C62 11 70 12 71 22"
      stroke="white"
      strokeOpacity="0.25"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  );
};

export const CodeGlyph = () => {
  const pathClass = css({
    stroke: {
      base: token("colors.accent.secondary.12"),
      _dark: token("colors.accent.secondary.7"),
    },
  });

  return (
    <Fragment>
      <path
        d="M41 34L34 40L41 46"
        className={pathClass}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47 34L54 40L47 46"
        className={pathClass}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  );
};

export const Wordmark = ({
  children = "Typecraft",
  ...props
}: HTMLAttributes<SVGTextElement>) => {
  return (
    <text
      x="96"
      y="56"
      fontSize="34px"
      fontWeight="600"
      fill="currentColor"
      fontFamily="var(--font-family-body)"
      {...props}
    >
      {children}
    </text>
  );
};
