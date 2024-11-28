import { type WorkType } from "@/types/work";

export const types: Array<WorkType | "all"> = [
  "all",
  "blog",
  "website",
  "image",
  "video",
  "document",
  "code",
];

export const workNameMap: Record<WorkType, string> = {
  blog: "blog",
  website: "website",
  image: "image",
  video: "video",
  document: "document",
  code: "code",
};

export const workDictionary: Record<WorkType | "all", string> = {
  all: "全部",
  blog: "博客",
  website: "网站",
  image: "图片",
  video: "视频",
  document: "文档",
  code: "代码",
};
