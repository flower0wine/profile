export type WorkType =
  | "blog"
  | "website"
  | "image"
  | "video"
  | "document"
  | "code";

// 基础作品接口
export interface BaseWork {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
}

// 博客类型作品
export interface BlogWork extends BaseWork {
  type: "blog";
  excerpt: string;
  readingTime: string;
  link: string;
  thumbnail: string;
}

// 网站类型作品
export interface WebsiteWork extends BaseWork {
  type: "website";
  thumbnail: string;
  link: string;
  technologies: string[];
}

// 图片类型作品
export interface ImageWork extends BaseWork {
  type: "image";
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// 视频类型作品
export interface VideoWork extends BaseWork {
  type: "video";
  videoUrl: string;
  duration: string;
  fileSize: number;
  thumbnail: string;
}

// 文档类型作品
export interface DocumentWork extends BaseWork {
  type: "document";
  fileUrl: string;
  fileType: string;
  fileSize: string;
}

// 代码类型作品
export interface CodeWork extends BaseWork {
  type: "code";
  language: string;
  code: string;
  sourceUrl: string;
}

// 统一作品类型
export type Work =
  | BlogWork
  | WebsiteWork
  | ImageWork
  | VideoWork
  | DocumentWork
  | CodeWork;
