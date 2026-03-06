import { css, cx } from "styled-system/css";
import type { BoxProps } from "styled-system/jsx";
import { Box } from "styled-system/jsx";
import { THEME_META } from "@/theme/themes/meta";
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
  const backgroundImage = THEME_META[theme].marbleBackgroundImage;

  return (
    <Box
      as="span"
      aria-hidden="true"
      className={cx(
        marbleBase,
        css({
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage,
        }),
        className,
      )}
      {...props}
    />
  );
}

const marbleBase = css({
  display: "inline-block",
  flexShrink: 0,
  borderRadius: "full",
  borderWidth: "1px",
  borderColor: "border",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  boxShadow: "inset 0 0 0 1px {colors.gray.a3}",
});
