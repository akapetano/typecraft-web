import {
  CodeGlyph,
  Key,
  KeyBase,
  KeyFace,
  KeyHighlight,
  KeyRoot,
  KeyShadow,
  Wordmark,
} from "@/components/core/Logo/components/Key";
import { LOGO_SIZES } from "@/components/core/Logo/Logo.constants";
import type { LogoSize } from "@/components/core/Logo/Logo.types";

export interface LogoProps {
  size?: LogoSize;
}

export const Logo = ({ size = "md" }: LogoProps) => {
  return (
    <KeyRoot width={LOGO_SIZES[size].width} height={LOGO_SIZES[size].height}>
      <Key>
        <KeyShadow />
        <KeyBase />
        <KeyFace />
        <g transform="translate(0 -4)">
          <KeyHighlight />
          <CodeGlyph />
        </g>
      </Key>
      <Wordmark />
    </KeyRoot>
  );
};
