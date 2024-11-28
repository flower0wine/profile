"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import { Search, Calendar, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@/types/blog";
import { formatDate } from "@/lib/format-date";

// API 请求函数
async function fetchAllBlogs() {
  const res = await fetch("/api/blog/all");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json() as Promise<Blog[]>;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // 使用 TanStack Query 获取并缓存博客数据
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
    enabled: open, // 仅在对话框打开时获取数据
    staleTime: 5 * 60 * 1000, // 数据 5 分钟内不会被标记为过期
    gcTime: 10 * 60 * 1000, // 垃圾回收时间（原 cacheTime）
    refetchOnWindowFocus: false, // 窗口聚焦时不重新获取
  });

  // 快捷键监听
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 过滤博客
  const filteredBlogs = blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group flex w-full items-center gap-2",
          "rounded-lg border border-border bg-background/50",
          "px-4 py-2 text-sm text-muted-foreground",
          "backdrop-blur transition-colors",
          "hover:border-border/80 hover:bg-background"
        )}
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">搜索文章...</span>
        <kbd className="hidden rounded bg-muted px-2 text-xs md:inline-block">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="container flex items-start justify-center pt-20"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl rounded-lg border bg-card shadow-lg"
              >
                <Command
                  className="overflow-hidden rounded-lg"
                  onKeyDown={e => {
                    if (e.key === "Escape") setOpen(false);
                  }}
                >
                  <div className="flex items-center border-b px-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Command.Input
                      value={search}
                      onValueChange={setSearch}
                      placeholder="搜索文章..."
                      className="flex-1 border-0 bg-transparent px-2 py-4 outline-none placeholder:text-muted-foreground"
                    />
                    <button onClick={() => setOpen(false)}>
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <Command.List className="scrollbar-sm max-h-[60vh] overflow-y-auto p-2">
                    {isLoading ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        加载中...
                      </div>
                    ) : filteredBlogs.length === 0 && search ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        未找到相关文章
                      </div>
                    ) : (
                      filteredBlogs.map(blog => (
                        <Command.Item
                          key={blog.id}
                          value={blog.title}
                          onSelect={() => {
                            router.push(`/blog/${blog.slug}`);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex cursor-pointer flex-col gap-1",
                            "rounded-md p-3 hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{blog.title}</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <time dateTime={blog.publishDate}>
                                {formatDate(blog.publishDate)}
                              </time>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                              <span
                                key={tag}
                                className="flex items-center gap-1 text-xs text-muted-foreground"
                              >
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Command.Item>
                      ))
                    )}
                  </Command.List>
                </Command>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
