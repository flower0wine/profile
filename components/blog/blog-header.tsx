"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/blog";
import { formatDate } from "@/lib/format-date";

interface BlogHeaderProps {
  blog: Blog;
}

export function BlogHeader({ blog }: BlogHeaderProps) {
  if (!blog) return null;

  return (
    <motion.header
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 标题 */}
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {blog.title}
      </h1>

      {/* 元信息 */}
      <div className="flex flex-wrap gap-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{blog.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={blog.publishDate}>
            {formatDate(blog.publishDate)}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{blog.readingTime}</span>
        </div>
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2">
        {blog.tags.map(tag => (
          <motion.span
            key={tag}
            className={cn(
              "inline-flex items-center rounded-full",
              "bg-primary/10 px-3 py-1 text-sm text-primary"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Tag className="mr-1 h-3 w-3" />
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.header>
  );
}
