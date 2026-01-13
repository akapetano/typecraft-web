import { Box } from "styled-system/jsx";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import type { ColorMode } from "@/types/theme/colorMode";

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  colorMode?: ColorMode;
}

export const AppLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  colorMode,
}: AppLayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {showHeader && <Header colorMode={colorMode} />}

      <Box as="main" flex="1" display="flex" flexDirection="column">
        {children}
      </Box>

      {showFooter && <Footer />}
    </Box>
  );
};
