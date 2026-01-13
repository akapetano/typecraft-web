import type { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface LucideIconProps extends LucideProps {
  name: IconName;
}

export const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Icon "${name}" not found in lucide-react`);
    }
    return null;
  }

  return <LucideIcon {...props} />;
};
