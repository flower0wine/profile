"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TimeInfo } from "@/components/works/cards/components/time-info";
import { Eye, Heart, ExternalLink } from "lucide-react";
import type { CodeWork } from "@/types/work";
import { useShare } from "@/hooks/use-share";
import { ShareButton } from "@/components/works/cards/components/share-button";
import { CodeBlock } from "@/components/shared/code-block";

interface CodeCardProps {
  work: CodeWork;
}

export function CodeCard({ work }: CodeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount] = useState(Math.floor(Math.random() * 100) + 10);
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: work.title,
      text: work.description,
      url: work.sourceUrl,
      onError: error => {
        console.error("分享代码失败:", error);
        // 这里可以添加错误提示 UI
      },
    });
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg",
        "bg-card shadow-lg transition-all hover:shadow-xl"
      )}
      whileHover={{ y: -5 }}
    >
      {/* 代码预览 */}
      <div className="relative">
        <div className={cn("relative overflow-hidden")}>
          <CodeBlock
            code={work.code}
            language={work.language}
            maxHeight="300px"
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <div className="mb-3">
          <h3
            className={cn(
              "mb-2 text-lg font-semibold",
              "transition-colors group-hover:text-primary"
            )}
          >
            {work.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {work.description}
          </p>
        </div>

        {/* 统计信息 */}
        <div
          className={cn(
            "mb-3 flex items-center gap-4",
            "text-sm text-muted-foreground"
          )}
        >
          <TimeInfo createdAt={work.createdAt} className="!gap-1" />
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{viewCount}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Heart
              className="h-4 w-4"
              fill={isLiked ? "currentColor" : "none"}
              onClick={() => setIsLiked(!isLiked)}
            />
            <span>{likeCount + (isLiked ? 1 : 0)}</span>
          </div>
        </div>

        {/* 标签 */}
        <div className="mb-3 flex flex-wrap gap-2">
          {work.tags.map(tag => (
            <span
              key={tag}
              className={cn(
                "rounded-full bg-muted px-2 py-1",
                "text-xs text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
          <a
            href={work.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("flex items-center gap-1", "text-sm text-primary")}
          >
            <span>查看源码</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <div className="flex gap-2">
            <ShareButton onShare={handleShare} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
