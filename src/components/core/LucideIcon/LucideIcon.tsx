import type { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;

interface LucideIconProps extends LucideProps {
  name: IconName;
}

export const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: dynamic lookup by name is intentional
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Icon "${name}" not found in lucide-react`);
    }
    return null;
  }

  return <LucideIcon {...props} />;
};
