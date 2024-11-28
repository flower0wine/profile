"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
}
