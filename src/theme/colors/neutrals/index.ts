import { mauve } from "@/theme/colors/neutrals/mauve";
import { neutral } from "@/theme/colors/neutrals/neutral";
import { olive } from "@/theme/colors/neutrals/olive";
import { sage } from "@/theme/colors/neutrals/sage";
import { sand } from "@/theme/colors/neutrals/sand";
import { slate } from "@/theme/colors/neutrals/slate";

export const NEUTRAL_PALETTES = {
  neutral,
  mauve,
  olive,
  sage,
  sand,
  slate,
} as const;

export type NeutralPaletteName = keyof typeof NEUTRAL_PALETTES;
export type NeutralPalette = (typeof NEUTRAL_PALETTES)[NeutralPaletteName];
