import { Box } from "styled-system/jsx";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import type { ColorMode } from "@/types/theme/colorMode";
import type { Theme } from "@/types/theme/theme";

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  colorMode?: ColorMode;
  theme?: Theme;
}

export const AppLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  colorMode,
  theme,
}: AppLayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {showHeader && <Header colorMode={colorMode} theme={theme} />}

      <Box as="main" flex="1" display="flex" flexDirection="column">
        {children}
      </Box>

      {showFooter && <Footer />}
    </Box>
  );
};
