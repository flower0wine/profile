"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export function WorksHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center"
    >
      <motion.div
        className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Briefcase className="h-6 w-6 text-primary" />
      </motion.div>
      <h1 className="mb-4 text-4xl font-bold">我的作品集</h1>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        这里展示了我的各类作品，包括博客文章、网站项目、图片作品、视频创作和技术文档等。
        每一个作品都代表了我在不同领域的探索和成长。
      </p>
    </motion.div>
  );
}
