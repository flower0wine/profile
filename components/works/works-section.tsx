"use client";

import { motion, Variants } from "framer-motion";
import { useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import { WorkFilter } from "./work-filter";
import { WorkSearch } from "./work-search";
import { type Work, type WorkType } from "@/types/work";
import { BlogCard } from "./cards/blog-card";
import { WebsiteCard } from "./cards/website-card";
import { ImageCard } from "./cards/image-card";
import { VideoCard } from "./cards/video-card";
import { DocumentCard } from "./cards/document-card";
import { CodeCard } from "./cards/code-card";

interface WorksSectionProps {
  works: Work[];
}

// 响应式断点设置
const breakpointColumns = {
  default: 3, // 默认显示3列
  1100: 2, // 屏幕宽度 <= 1100px 时显示2列
  700: 1, // 屏幕宽度 <= 700px 时显示1列
};

const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.5,
    },
  },
};

const renderWorkCard = (work: Work) => {
  switch (work.type) {
    case "blog":
      return <BlogCard work={work} />;
    case "website":
      return <WebsiteCard work={work} />;
    case "image":
      return <ImageCard work={work} />;
    case "video":
      return <VideoCard work={work} />;
    case "document":
      return <DocumentCard work={work} />;
    case "code":
      return <CodeCard work={work} />;
  }
};

function WorkItem({ work }: { work: Work }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.32 }}
      className="mb-6"
    >
      <motion.div variants={cardVariants}>{renderWorkCard(work)}</motion.div>
    </motion.div>
  );
}

export function WorksSection({ works }: WorksSectionProps) {
  const [selectedType, setSelectedType] = useState<WorkType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      const matchesType = selectedType === "all" || work.type === selectedType;
      const matchesSearch =
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesType && matchesSearch;
    });
  }, [works, selectedType, searchQuery]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md"
          >
            <WorkSearch
              onSearch={setSearchQuery}
              totalWorks={filteredWorks.length}
              selectedType={selectedType}
            />
          </motion.div>

          <WorkFilter
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>

        <motion.div
          key={selectedType + searchQuery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 瀑布流布局 */}
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredWorks.map(work => (
              <WorkItem key={work.id} work={work} />
            ))}
          </Masonry>
        </motion.div>

        {filteredWorks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-muted-foreground"
          >
            没有找到匹配的作品
          </motion.div>
        )}
      </div>
    </section>
  );
}
