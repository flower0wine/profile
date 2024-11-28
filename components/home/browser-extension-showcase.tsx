"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiDownload, FiCopy, FiSun, FiMoon, FiGithub } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { IBrowserExtension } from "@/mock/products/browserExtension";

export function BrowserExtensionShowcase({
  name,
  description,
  downloadUrl,
  githubUrl,
  icon,
  features,
  screenshots,
}: IBrowserExtension) {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5" />
        <motion.div className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* 左侧：产品信息 */}
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={icon}
                  alt={`${name} 图标`}
                  fill
                  sizes="4rem"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {name}
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            {/* 数据统计 */}
            {/* <div className="flex gap-6 border-y py-4">
              <div>
                <p className="text-2xl font-semibold">{users}</p>
                <p className="text-sm text-muted-foreground">活跃用户</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{rating}</p>
                <p className="text-sm text-muted-foreground">用户评分</p>
              </div>
            </div> */}

            {/* 下载按钮 */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="1"
                className="group relative overflow-hidden"
                asChild
              >
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <FiDownload className="mr-2 h-5 w-5" />
                  <span>下载插件</span>
                  <motion.div
                    className="absolute inset-0 -z-10 bg-primary/10"
                    initial={false}
                    animate={{
                      scale: [1, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </a>
              </Button>
              <Button size="1" variant="outline" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <FiGithub className="mr-2 h-5 w-5" />
                  <span>查看源码</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 右侧：功能展示 */}
        <div className="lg:col-span-7">
          {/* 主题预览 */}
          <motion.div
            className="mb-8 overflow-hidden rounded-xl border bg-background shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* 浏览器标题栏 */}
            <div className="flex h-10 items-center justify-between border-b bg-muted/30 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTheme("light")}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    activeTheme === "light"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <FiSun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTheme("dark")}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    activeTheme === "dark"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <FiMoon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 优化后的截图预览 */}
            <div className="relative min-h-[280px]">
              {/* 背景装饰球体 */}
              <div className="absolute inset-0 overflow-hidden">
                {/* 左侧红色球体 */}
                <motion.div
                  className={cn(
                    "absolute h-64 w-64 rounded-full blur-[100px]",
                    "left-0 top-1/4",
                    "bg-red-500/50"
                  )}
                />
                {/* 右侧蓝色球体 */}
                <motion.div
                  className={cn(
                    "absolute h-64 w-64 rounded-full blur-[100px]",
                    "-right-10 top-1/3",
                    "bg-blue-500/50"
                  )}
                />
              </div>

              {/* 截图展示区域 */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {screenshots.map(
                    screenshot =>
                      activeTheme === screenshot.theme && (
                        <motion.div
                          key={screenshot.src}
                          className="flex justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="group relative w-[80%] md:w-[320px]">
                            {/* 截图容器 */}
                            <div
                              className={cn(
                                "relative aspect-[3/4] rounded-xl",
                                "bg-white/10 dark:bg-black/10",
                                "shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                              )}
                            >
                              <Image
                                src={screenshot.src}
                                alt={screenshot.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={cn("object-contain", "p-2")}
                                priority
                              />

                              {/* 玻璃态边框效果 */}
                              <div
                                className={cn(
                                  "absolute inset-0 rounded-xl",
                                  "ring-1 ring-white/20 dark:ring-white/10"
                                )}
                              />
                            </div>

                            {/* 投影效果 */}
                            <div
                              className={cn(
                                "absolute -inset-1 -z-10 rounded-xl",
                                "bg-gradient-to-b from-white/5 to-transparent",
                                "dark:from-white/10",
                                "blur-xl",
                                "opacity-0 group-hover:opacity-100",
                                "transition-opacity duration-500"
                              )}
                            />
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 功能列表 */}
          <div className="space-y-4">
            <motion.div
              className="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FiCopy className="mt-1 h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">一键启用复制</p>
                <p className="text-sm text-muted-foreground">
                  无限制地复制网页上任何内容，支持 HTML 格式
                </p>
              </div>
            </motion.div>

            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Icon className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
