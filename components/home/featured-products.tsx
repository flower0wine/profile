"use client";

import { motion, Variants } from "framer-motion";
import { BrowserExtensionShowcase } from "./browser-extension-showcase";
import { FlappyBirdShowcase } from "./flappy-bird-showcase";
import { featuredProductsData } from "@/mock/produect";
import { HuadiaoShowcase } from "./huadiao-showcase";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const sectionVariants: Variants = {
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
      bounce: 0.7,
    },
  },
};

export function FeaturedProducts() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative py-20"
    >
      {/* 区域标题 */}
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          variants={itemVariants}
          className="mb-16 text-center text-4xl font-bold"
        >
          精选产品
          <span className="mt-2 block text-lg font-normal text-muted-foreground">
            探索我开发的实用工具和应用
          </span>
        </motion.h2>

        {/* 浏览器插件展示 */}
        <motion.div
          variants={sectionVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-32"
        >
          {featuredProductsData.browserExtensions.map(browserExtension => (
            <BrowserExtensionShowcase
              key={browserExtension.name}
              {...browserExtension}
            />
          ))}
        </motion.div>

        {/* Flappy Bird 游戏展示 */}
        <motion.div
          variants={sectionVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-32"
        >
          <FlappyBirdShowcase {...featuredProductsData.flappyBird} />
        </motion.div>

        {/* 花凋网站展示 */}
        <motion.div
          variants={sectionVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-32"
        >
          <HuadiaoShowcase {...featuredProductsData.huadiao} />
        </motion.div>

        {/* 这里可以添加其他产品展示组件 */}
        {/* 例如：
        {data.mobileApp && (
          <motion.div variants={itemVariants}>
            <MobileAppShowcase {...data.mobileApp} />
          </motion.div>
        )}
        */}
      </div>
    </motion.section>
  );
}
