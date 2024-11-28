"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FiGithub, FiPlay } from "react-icons/fi";
import { GiRetroController } from "react-icons/gi";
import { cn } from "@/lib/utils";
import type { IFlappyBird } from "@/mock/products/flappyBird";
import { Carousel } from "@/components/ui/carousel";

export function FlappyBirdShowcase({
  name,
  description,
  githubUrl,
  playUrl,
  features,
  screenshots,
}: IFlappyBird) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative mx-auto w-full max-w-6xl",
        "px-4 py-12 sm:px-6 lg:px-8"
      )}
    >
      {/* 背景装饰 - 像素风云朵和管道 */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-b from-sky-100/50 to-sky-200/50",
            "dark:from-sky-900/30 dark:to-sky-800/30"
          )}
        />
        {/* 动态云朵 */}
        <motion.div
          className={cn(
            "absolute top-1/4 h-32 w-32",
            "bg-white/80 dark:bg-white/20",
            "rounded-full blur-2xl"
          )}
          animate={{
            x: [-50, 50],
            y: [-20, 20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* 左侧：游戏信息 */}
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
                  "flex h-16 w-16 flex-shrink-0 items-center justify-center",
                  "rounded-xl bg-yellow-400/90 dark:bg-yellow-500/90",
                  "shadow-lg shadow-yellow-400/20 dark:shadow-yellow-500/20",
                  "transform-gpu transition-transform duration-300 hover:scale-105"
                )}
              >
                <GiRetroController className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            {/* 特性列表 */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={cn(
                    "rounded-lg p-4",
                    "bg-white/50 dark:bg-white/5",
                    "border border-white/20",
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
                className="group relative overflow-hidden"
                asChild
              >
                <a href={playUrl} target="_blank" rel="noopener noreferrer">
                  <FiPlay className="mr-2 h-5 w-5" />
                  <span>开始游戏</span>
                  <motion.div
                    className={cn("absolute inset-0 -z-10", "bg-primary/10")}
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
              <Button size="1" variant="outline" className="group" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <FiGithub className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span>查看源码</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 右侧：游戏预览 */}
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
                "border border-yellow-100/20 dark:border-yellow-500/10",
                "shadow-lg"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Carousel
                images={screenshots}
                autoplay
                interval={4000}
                options={{
                  loop: true,
                }}
                aspectRatio="video"
                dotClassName="bg-yellow-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
