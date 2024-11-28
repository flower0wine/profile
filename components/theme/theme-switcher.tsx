"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="1"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative h-8 w-8 cursor-pointer rounded-full",
        "transition-colors duration-200"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
        {resolvedTheme === "dark" ? (
          <SunIcon className="h-4 w-4 transition-transform duration-300" />
        ) : (
          <MoonIcon className="h-4 w-4 transition-transform duration-300" />
        )}
      </div>
    </Button>
  );
}
