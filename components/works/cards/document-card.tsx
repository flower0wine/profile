"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  FileEdit,
  FileSpreadsheet,
  Presentation,
  FileJson,
  FileArchive,
  FileImage,
  FileAudio,
  FileVideo,
  File,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DocumentWork } from "@/types/work";
import { cn } from "@/lib/utils";
import { TimeInfo } from "@/components/works/cards/components/time-info";
import { useShare } from "@/hooks/use-share";
import { ShareButton } from "./components/share-button";

interface DocumentCardProps {
  work: DocumentWork;
}

// 文件类型图标和颜色映射
const fileTypeConfig: Record<string, { icon: LucideIcon; color: string }> = {
  pdf: { icon: FileText, color: "bg-red-500/10 text-red-500" },
  doc: { icon: FileEdit, color: "bg-blue-500/10 text-blue-500" },
  docx: { icon: FileEdit, color: "bg-blue-500/10 text-blue-500" },
  xls: { icon: FileSpreadsheet, color: "bg-green-500/10 text-green-500" },
  xlsx: { icon: FileSpreadsheet, color: "bg-green-500/10 text-green-500" },
  ppt: { icon: Presentation, color: "bg-orange-500/10 text-orange-500" },
  pptx: { icon: Presentation, color: "bg-orange-500/10 text-orange-500" },
  txt: { icon: FileText, color: "bg-gray-500/10 text-gray-500" },
  csv: { icon: FileSpreadsheet, color: "bg-green-500/10 text-green-500" },
  json: { icon: FileJson, color: "bg-purple-500/10 text-purple-500" },
  js: { icon: FileJson, color: "bg-yellow-500/10 text-yellow-500" },
  ts: { icon: FileJson, color: "bg-blue-500/10 text-blue-500" },
  zip: { icon: FileArchive, color: "bg-amber-500/10 text-amber-500" },
  rar: { icon: FileArchive, color: "bg-amber-500/10 text-amber-500" },
  jpg: { icon: FileImage, color: "bg-pink-500/10 text-pink-500" },
  png: { icon: FileImage, color: "bg-pink-500/10 text-pink-500" },
  mp3: { icon: FileAudio, color: "bg-indigo-500/10 text-indigo-500" },
  mp4: { icon: FileVideo, color: "bg-violet-500/10 text-violet-500" },
};

export function DocumentCard({ work }: DocumentCardProps) {
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const fileConfig = fileTypeConfig[work.fileType] || {
    icon: File,
    color: "bg-gray-500/10 text-gray-500",
  };
  const { share } = useShare();
  const handleShare = async () => {
    share({
      title: work.title,
      text: work.description,
      url: work.fileUrl,
    });
  };

  // 格式化文件大小
  const formatFileSize = (size: string) => {
    const num = parseInt(size);
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg",
        "bg-card shadow-lg transition-all hover:shadow-xl"
      )}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        {/* 文件图标 */}
        <div className="mb-4 flex items-center justify-center">
          <motion.div
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-xl",
              fileConfig.color
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <fileConfig.icon className="h-10 w-10" />
          </motion.div>
        </div>

        {/* 文件信息 */}
        <div className="mb-3 text-center">
          <h3
            className={cn(
              "mb-2 text-lg font-semibold",
              "transition-colors group-hover:text-primary"
            )}
          >
            {work.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {work.description}
          </p>
        </div>

        {/* 文件详情 */}
        <div
          className={cn(
            "mb-4 flex items-center justify-center gap-4",
            "text-sm text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{work.fileType.toUpperCase()}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{viewCount}</span>
          </div>
          <span>•</span>
          <span>{formatFileSize(work.fileSize)}</span>
        </div>
        <TimeInfo createdAt={work.createdAt} className="mb-4 justify-center" />

        {/* 标签 */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
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

        {/* 操作按钮 */}
        <div className="flex flex-col gap-2">
          <motion.a
            href={work.fileUrl}
            download
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "rounded-lg bg-primary px-4 py-2",
              "text-sm text-white/80",
              "transition-colors hover:bg-primary/90"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="h-4 w-4" />
            下载文件
          </motion.a>
          <div className="flex justify-between">
            <motion.a
              href={`${work.fileUrl}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("flex items-center gap-1", "text-sm text-primary")}
              whileHover={{ x: 2 }}
            >
              <span>在线预览</span>
              <ExternalLink className="h-4 w-4" />
            </motion.a>
            <ShareButton onShare={handleShare} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
