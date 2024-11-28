"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Briefcase, LucideIcon } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  // 可选：为每个链接添加独特的悬停颜色
  hoverColor?: string;
}

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

export function NavLinks({ className, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  const links: NavLink[] = [
    {
      href: "/",
      label: "首页",
      icon: Home,
    },
    {
      href: "/works",
      label: "作品",
      icon: Briefcase,
    },
  ];

  return (
    <nav className={cn("flex items-center gap-2", className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} onClick={onLinkClick}>
          <motion.div
            className={cn("relative rounded-lg px-4 py-2", "group")}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className={cn(
                  "relative z-10",
                  "transition-transform duration-300 ease-out",
                  "group-hover:-translate-y-[1px]"
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "transition-colors duration-300",
                    pathname === href
                      ? "dark:text-white" // 活动状态：完全不透明
                      : cn(
                          "dark:text-white/60", // 默认状态：60%不透明度
                          "dark:group-hover:text-white" // 悬浮状态：完全不透明
                        )
                  )}
                />
              </motion.div>

              <motion.span
                className={cn(
                  "relative z-10",
                  "transition-all duration-300 ease-out",
                  "group-hover:-translate-y-[1px]",
                  pathname === href
                    ? cn(
                        "font-medium",
                        "dark:text-white/90" // 活动状态：90%不透明度
                      )
                    : cn(
                        "dark:text-white/60", // 默认状态：60%不透明度
                        "dark:group-hover:text-white/90" // 悬浮状态：90%不透明度
                      )
                )}
              >
                {label}
              </motion.span>
            </div>
          </motion.div>
        </Link>
      ))}
    </nav>
  );
}
