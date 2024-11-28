"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink, Code, Eye } from "lucide-react";
import type { WebsiteWork } from "@/types/work";
import { TimeInfo } from "./components/time-info";

interface WebsiteCardProps {
  work: WebsiteWork;
}

export function WebsiteCard({ work }: WebsiteCardProps) {
  const viewCount = Math.floor(Math.random() * 1000) + 100;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg",
        "bg-card shadow-lg transition-all hover:shadow-xl"
      )}
      whileHover={{ y: -5 }}
    >
      {/* 顶部图片区域 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={cn(
            "object-cover",
            "transition-transform duration-300 group-hover:scale-105"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-t from-black/60 via-transparent to-transparent"
          )}
        />

        {/* 技术标签 - 悬浮时显示 */}
        <div
          className={cn(
            "absolute inset-x-0 top-0",
            "flex flex-wrap gap-2 p-4",
            "opacity-0 transition-opacity group-hover:opacity-100"
          )}
        >
          {work.technologies.map(tech => (
            <span
              key={tech}
              className={cn(
                "flex items-center gap-1",
                "rounded-full px-3 py-1",
                "bg-black/50 backdrop-blur-sm",
                "text-xs text-white"
              )}
            >
              <Code className="h-3 w-3" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="relative space-y-4 p-6">
        {/* 标题和描述 */}
        <div>
          <h3
            className={cn(
              "mb-2 text-xl font-bold",
              "transition-colors group-hover:text-primary"
            )}
          >
            {work.title}
          </h3>
          <p className="text-sm text-muted-foreground">{work.description}</p>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {work.tags.map(tag => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-2 py-1",
                "bg-muted text-xs text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 统计信息 */}
        <div
          className={cn(
            "flex items-center justify-between",
            "text-sm text-muted-foreground"
          )}
        >
          <TimeInfo createdAt={work.createdAt} />
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{viewCount} 次预览</span>
          </div>
        </div>

        {/* 访问按钮 */}
        <Link
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex w-full items-center justify-center gap-2",
            "rounded-lg px-4 py-2",
            "bg-primary text-sm text-white/80",
            "transition-colors hover:bg-primary/90"
          )}
        >
          <span>访问网站</span>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
