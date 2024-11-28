"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/blog";

interface RelatedBlogsProps {
  blogs: Blog[];
}

export function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">相关文章</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${blog.slug}`}
              className={cn(
                "group block overflow-hidden rounded-lg",
                "bg-card transition-all hover:shadow-lg"
              )}
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                  {blog.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <time className="text-muted-foreground">
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </time>
                  <span className="flex items-center gap-1 text-primary">
                    阅读更多
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
