"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogFooter } from "@/components/blog/blog-footer";
import { RelatedBlogs } from "@/components/blog/related-blogs";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { BackToTop } from "@/components/blog/back-to-top";
import { SearchDialog } from "@/components/blog/search-dialog";
import { cn } from "@/lib/utils";
import { Comments } from "@/components/blog/comments";
import type { Blog } from "@/types/blog";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

interface BlogDetailProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export function BlogDetail({ blog, relatedBlogs }: BlogDetailProps) {
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

  return (
    <>
      <ReadingProgress />
      <div
        className={cn(
          "min-h-screen w-full",
          "bg-gradient-to-b from-background to-background/80",
          "dark:from-background dark:to-background/90"
        )}
      >
        {/* 背景装饰 */}
        <div className="fixed inset-0 -z-10">
          <div className="bg-grid-pattern absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" />
          <div className="bg-gradient-radial absolute inset-0 from-accent/20 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* 搜索栏 */}
          <motion.div variants={itemVariants} className="my-8">
            <SearchDialog />
          </motion.div>

          <article className="mx-auto max-w-4xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-[minmax(0,1fr)_250px]"
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <BlogHeader blog={blog} />
                <BlogContent
                  blog={blog}
                  onHeadingsChange={setTableOfContents}
                />
              </motion.div>

              <motion.aside
                variants={itemVariants}
                className="ml-4 hidden md:block"
              >
                <div className="sticky top-20 space-y-8">
                  <TableOfContents headings={tableOfContents} />
                </div>
              </motion.aside>
            </motion.div>
          </article>

          {relatedBlogs.length > 0 && (
            <motion.section
              variants={itemVariants}
              className="border-t border-border/50"
            >
              <div className="mx-auto max-w-4xl py-8">
                <RelatedBlogs blogs={relatedBlogs} />
              </div>
            </motion.section>
          )}
        </div>
      </div>

      <BackToTop />

      {/* 评论部分 */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "border-t border-border/50",
          // 在移动端增加底部间距，避免被固定底栏遮挡
          "pb-24 md:pb-8"
        )}
      >
        <Comments />
      </motion.div>

      {/* 移动端固定底部交互栏 */}
      <motion.div
        className={cn(
          // 仅在移动端显示
          "fixed bottom-0 left-0 right-0 md:hidden",
          "bg-background/80 backdrop-blur-sm",
          "border-t border-border",
          "px-4 py-4",
          "z-50"
        )}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <BlogFooter blog={blog} />
      </motion.div>
    </>
  );
}
