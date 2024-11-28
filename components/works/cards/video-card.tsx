"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { TimeInfo } from "@/components/works/cards/components/time-info";
import { Play, X, Heart, Eye, ExternalLink, FileText } from "lucide-react";
import type { VideoWork } from "@/types/work";
import { useShare } from "@/hooks/use-share";
import { ShareButton } from "./components/share-button";
import { formatFileSize } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/shared/video-player";

interface VideoCardProps {
  work: VideoWork;
}

export function VideoCard({ work }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount] = useState(Math.floor(Math.random() * 100) + 10);
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: work.title,
      text: work.description,
      url: work.videoUrl,
      onError: error => {
        console.error("分享视频失败:", error);
        // 这里可以添加错误提示 UI
      },
    });
  };

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
              onClick={() => setIsPlaying(true)}
              className="rounded-full bg-primary/90 p-4 transition-transform group-hover:scale-110"
            >
              <Play className="h-6 w-6" fill="white" stroke="white" />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white">
              {work.duration}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
              {work.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {work.description}
            </p>
          </div>

          <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
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
            <span>•</span>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{formatFileSize(work.fileSize)}</span>
            </div>
          </div>
          <TimeInfo createdAt={work.createdAt} className="mb-3" />

          <div className="mb-3 flex flex-wrap gap-2">
            {work.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
            <a
              href={work.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary"
            >
              <span>查看原视频</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="flex gap-2">
              <ShareButton onShare={handleShare} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 视频播放模态框 */}
      {isPlaying &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-50",
              "flex items-center justify-center",
              "bg-background/80 backdrop-blur-sm",
              "p-4"
            )}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl"
            >
              <VideoPlayer
                src={work.videoUrl}
                poster={work.thumbnail}
                onEnded={() => setIsPlaying(false)}
                className="aspect-video w-full rounded-lg shadow-lg"
              />
              <button
                onClick={() => setIsPlaying(false)}
                className={cn(
                  "absolute -right-4 -top-4",
                  "rounded-full bg-background p-2",
                  "bg-muted/60 shadow-lg hover:bg-muted",
                  "transition-colors"
                )}
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  );
}
