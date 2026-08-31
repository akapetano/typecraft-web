import type { IconProps } from "@/components/core/Icon/Icon";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";

type VolumeIconProps = IconProps & {
  volume: number;
  enabled: boolean;
};

const getIconName = (enabled: boolean, volume: number) => {
  if (!enabled) return "VolumeOff";
  return volume === 0 ? "VolumeX" : volume > 0.5 ? "Volume2" : `Volume1`;
};

export const VolumeIcon = ({ enabled, volume, ...props }: VolumeIconProps) => {
  const iconName = getIconName(enabled, volume);

  return (
    <Icon {...props}>
      <LucideIcon name={iconName} />
    </Icon>
  );
};
