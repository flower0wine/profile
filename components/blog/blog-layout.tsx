"use client";

import { cn } from "@/lib/utils";
import { ReadingProgress } from "./reading-progress";
import { BackToTop } from "./back-to-top";

interface BlogLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BlogLayout({ children, className }: BlogLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <div
        className={cn(
          "w-full",
          "bg-gradient-to-b from-background to-background/80",
          "dark:from-background dark:to-background/90",
          className
        )}
      >
        {/* 背景装饰 */}
        <div className="fixed inset-0 -z-10">
          <div className="bg-grid-pattern absolute inset-0 opacity-[0.32] dark:opacity-[0.34]" />
          <div className="bg-gradient-radial absolute inset-0 from-accent/20 via-transparent to-transparent blur-3xl" />
        </div>

        {/* 主要内容 */}
        <div className="container mx-auto px-4 py-8 md:px-8">{children}</div>
      </div>
      <BackToTop />
    </>
  );
}
