"use client";

import { motion } from "framer-motion";
import { Share2, ThumbsUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/blog";

interface BlogFooterProps {
  blog: Blog;
}

export function BlogFooter({ blog }: BlogFooterProps) {
  if (!blog) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("分享失败:", err);
      }
    }
  };

  return (
    <motion.footer
      className="border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <motion.button
            className={cn(
              "flex items-center gap-2 rounded-full",
              "bg-primary/10 px-4 py-2 text-primary"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>点赞</span>
          </motion.button>

          <motion.button
            className={cn(
              "flex items-center gap-2 rounded-full",
              "bg-primary/10 px-4 py-2 text-primary"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>分享</span>
          </motion.button>
        </div>

        <motion.button
          className={cn(
            "flex items-center gap-2 rounded-full",
            "bg-primary/10 px-4 py-2 text-primary"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const commentSection = document.getElementById("comments");
            commentSection?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        >
          <MessageSquare className="h-4 w-4" />
          <span>评论</span>
        </motion.button>
      </div>
    </motion.footer>
  );
}
