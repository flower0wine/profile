"use client";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(4px)"]);
  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-50",
        "transition-all duration-300",
        "bg-gradient-to-b from-background/95 to-background/75",
        "dark:from-background/90 dark:to-background/70"
      )}
      style={{
        backdropFilter: headerBlur,
      }}
    >
      <motion.div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo/标题区域 */}
          <motion.div
            className="flex cursor-pointer items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className={cn(
                "text-xl font-bold",
                "text-foreground",
                "transition-colors duration-300",
                "dark:text-foreground"
              )}
            >
              我的作品集
            </span>
          </motion.div>

          {/* 导航链接 */}
          <div className="hidden lg:block">
            <NavLinks />
          </div>

          {/* 工具栏 */}
          <div className="flex items-center gap-4">
            <motion.div className="flex items-center gap-4">
              <ThemeSwitcher />
              <MobileMenu />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
