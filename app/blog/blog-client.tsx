"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { BlogLayout } from "@/components/blog/blog-layout";
import { BlogDetail } from "@/components/blog/blog-detail";
import type { Blog } from "@/types/blog";
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface BlogClientProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export function BlogClient({ blog, relatedBlogs }: BlogClientProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen pt-16"
    >
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>

      <motion.div variants={itemVariants}>
        <BlogLayout>
          <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
        </BlogLayout>
      </motion.div>
    </motion.main>
  );
}
