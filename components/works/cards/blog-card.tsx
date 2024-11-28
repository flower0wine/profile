"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Eye } from "lucide-react";
import type { BlogWork } from "@/types/work";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TimeInfo } from "@/components/works/cards/components/time-info";

interface BlogCardProps {
  work: BlogWork;
}

export function BlogCard({ work }: BlogCardProps) {
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg",
        "bg-card shadow-lg transition-all hover:shadow-xl"
      )}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative p-6">
        <div
          className={cn(
            "mb-2 flex items-center gap-4",
            "text-sm text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{work.readingTime}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{viewCount} 次浏览</span>
          </div>
        </div>

        <h3
          className={cn(
            "mb-4 text-xl font-bold",
            "transition-colors group-hover:text-primary"
          )}
        >
          {work.title}
        </h3>

        <p className="mb-6 text-sm text-muted-foreground">{work.excerpt}</p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
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

          <div className="flex items-center justify-between">
            <TimeInfo createdAt={work.createdAt} />
            <Link
              href={work.link}
              className={cn("flex items-center gap-2", "text-sm text-primary")}
            >
              阅读更多
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
