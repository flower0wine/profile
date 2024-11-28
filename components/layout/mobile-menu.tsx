"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "./nav-links";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* 菜单按钮 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-lg p-2",
          "hover:bg-accent/20",
          "transition-colors duration-200",
          isOpen && "bg-accent/20"
        )}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "h-screen w-screen",
                "fixed inset-0 top-16 z-40",
                "bg-background/60 backdrop-blur-md",
                "dark:bg-background/70"
              )}
              onClick={() => setIsOpen(false)}
            />

            {/* 菜单面板 */}
            <motion.div
              className={cn(
                "fixed inset-x-0 top-16 z-50",
                "bg-gradient-to-b from-background/95 via-background/90 to-background/95",
                "dark:from-background/95 dark:via-background/90 dark:to-background/95",
                "before:absolute before:inset-0",
                "before:bg-gradient-to-r before:from-accent/0 before:via-accent/5 before:to-accent/0",
                "dark:before:from-accent/0 dark:before:via-accent/10 dark:before:to-accent/0",
                "after:absolute after:inset-x-0 after:top-0 after:h-px",
                "after:bg-gradient-to-r after:from-accent/0 after:via-accent/20 after:to-accent/0",
                "dark:after:from-accent/0 dark:after:via-accent/30 dark:after:to-accent/0"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <motion.div
                className={cn(
                  "container mx-auto px-4 py-6",
                  "bg-gradient-to-b from-transparent via-accent/5 to-transparent",
                  "dark:via-accent/10"
                )}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  staggerChildren: 0.1,
                }}
              >
                <NavLinks
                  className="flex-col items-center space-y-4"
                  onLinkClick={() => setIsOpen(false)}
                />

                {/* 底部额外内容区域 */}
                <motion.div
                  className={cn(
                    "mt-6 pt-6",
                    "border-t border-accent/10",
                    "dark:border-accent/20"
                  )}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* 额外的菜单项 */}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
