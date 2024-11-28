"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CommentsProps {
  className?: string;
}

export function Comments({ className }: CommentsProps) {
  const { theme } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full py-8", className)}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold" id="comments">
          评论
        </h2>
        <div
          className={cn(
            "overflow-hidden rounded-lg border border-border",
            "bg-card/50 backdrop-blur-sm",
            "p-4 md:p-6"
          )}
        >
          <div className="[&>iframe]:!w-full">
            <Giscus
              repo="flower0wine/flower0wine"
              repoId="R_kgDOMd1wWw"
              category="Announcements"
              categoryId="DIC_kwDOMd1wW84Cklr3"
              mapping="pathname" // 评论与当前页面路径关联
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={theme === "dark" ? "dark_dimmed" : "light"}
              lang="zh-CN"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
