import { css, cx } from "styled-system/css";
import type { BoxProps } from "styled-system/jsx";
import { Box } from "styled-system/jsx";
import { marble } from "styled-system/recipes";
import type { Theme } from "@/types/theme/theme";

type ThemeMarbleProps = BoxProps & {
  theme: Theme;
  size?: number;
  className?: string;
};

export function ThemeMarble({
  theme,
  size = 20,
  className,
  ...props
}: ThemeMarbleProps) {
  return (
    <Box
      as="span"
      aria-hidden="true"
      data-panda-theme={theme}
      className={cx(
        marble(),
        css({
          width: `${size}px`,
          height: `${size}px`,
        }),
        className,
      )}
      {...props}
    />
  );
}
