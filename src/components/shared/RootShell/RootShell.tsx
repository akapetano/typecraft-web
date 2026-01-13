import { geistMono, spaceGrotesk } from "@/theme/nextFonts";

interface RootShellProps {
  children: React.ReactNode;
  lang?: string;
}

export const RootShell = ({ children, lang = "en" }: RootShellProps) => {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};
