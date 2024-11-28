"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { IHuadiaoWebsite } from "@/mock/products/huadiao";
import { Carousel } from "@/components/ui/carousel";

export function HuadiaoShowcase({
  name,
  description,
  githubUrl,
  demoUrl,
  features,
  screenshots,
  techStack,
  icon,
}: IHuadiaoWebsite) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative mx-auto w-full max-w-6xl",
        "px-4 py-12 sm:px-6 lg:px-8"
      )}
    >
      {/* 背景装饰 - 中国风水墨效果 */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-br from-red-50 via-background to-red-100",
            "dark:from-red-950/30 dark:via-background dark:to-red-900/30"
          )}
        />
        {/* 水墨效果装饰 */}
        <motion.div
          className={cn(
            "absolute -right-1/4 top-1/4 h-96 w-96",
            "bg-red-500/50 dark:bg-red-400/50",
            "rounded-full blur-[100px]"
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* 左侧：网站信息 */}
        <div className="lg:col-span-5">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 标题和图标 */}
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "relative h-16 w-16 flex-shrink-0 overflow-hidden",
                  "rounded-xl bg-gradient-to-br",
                  "shadow-lg shadow-red-500/20",
                  "transform-gpu transition-transform duration-300 hover:scale-105"
                )}
              >
                <Image
                  src={icon}
                  alt="花凋网站图标"
                  fill
                  sizes="4rem"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            {/* 技术栈标签 */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm",
                    "bg-red-100 dark:bg-red-900/30",
                    "text-red-800 dark:text-red-200",
                    "border border-red-200 dark:border-red-800",
                    "transform-gpu transition-all duration-300",
                    "hover:scale-105 hover:bg-red-200 dark:hover:bg-red-800/40"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* 特性列表 */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={cn(
                    "rounded-lg p-4",
                    "bg-white/50 dark:bg-white/5",
                    "border border-red-100/20 dark:border-red-500/10",
                    "shadow-sm",
                    "transform-gpu transition-all duration-300",
                    "hover:scale-[1.02] hover:bg-white/60 dark:hover:bg-white/10"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="1"
                className={cn(
                  "group relative overflow-hidden",
                  "bg-red-500 hover:bg-red-600",
                  "text-white"
                )}
                asChild
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink className="mr-2 h-5 w-5" />
                  <span>访问网站</span>
                  <motion.div
                    className="absolute inset-0 -z-10 bg-red-400/20"
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
              <Button
                size="1"
                variant="outline"
                className={cn(
                  "group",
                  "border-red-200 dark:border-red-800",
                  "hover:bg-red-50 dark:hover:bg-red-900/30"
                )}
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <FiGithub className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span>查看源码</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 右侧：网站预览 */}
        <div className="lg:col-span-7">
          <motion.div
            className="mb-8 rounded-xl border bg-background shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex h-10 items-center justify-between border-b bg-muted/30 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
            <motion.div
              className={cn(
                "rounded-xl",
                "bg-white/50 dark:bg-white/5",
                "backdrop-blur-sm",
                "border border-red-100/20 dark:border-red-500/10",
                "shadow-lg"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Carousel
                images={screenshots}
                autoplay
                interval={5000}
                options={{
                  loop: true,
                }}
                dotClassName="bg-red-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
