"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X, Heart, Download, Eye } from "lucide-react";
import type { ImageWork } from "@/types/work";
import { TimeInfo } from "@/components/works/cards/components/time-info";
import { useShare } from "@/hooks/use-share";
import { ShareButton } from "./components/share-button";

interface ImageCardProps {
  work: ImageWork;
}

export function ImageCard({ work }: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount] = useState(Math.floor(Math.random() * 100) + 10);
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: work.title,
      text: work.description,
      url: work.imageUrl,
      onError: error => {
        console.error("分享图片失败:", error);
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
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={work.imageUrl}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-full bg-background/20 p-3 backdrop-blur-sm transition-transform hover:scale-110"
              >
                <Maximize2 className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 ${isLiked ? "bg-red-500" : "bg-background/20"}`}
              >
                <Heart
                  className="h-6 w-6 text-white"
                  fill={isLiked ? "currentColor" : "none"}
                />
              </button>
            </div>
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
              />
              <span>{likeCount + (isLiked ? 1 : 0)}</span>
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

          <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
            <ShareButton onShare={handleShare} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(work.imageUrl, "_blank")}
              className="rounded-full p-2 hover:bg-muted"
              title="下载"
            >
              <Download className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 使用 Portal 将模态框渲染到 body */}
      {isOpen &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -right-4 -top-4 rounded-full bg-background p-2 shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
              <Image
                src={work.imageUrl}
                alt={work.title}
                width={work.dimensions.width}
                height={work.dimensions.height}
                className="h-full w-full rounded-lg"
              />
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  );
}
