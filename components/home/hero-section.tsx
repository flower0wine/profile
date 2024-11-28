"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiGithub, FiMail, FiTwitter, FiYoutube } from "react-icons/fi";
import { PiWechatLogo } from "react-icons/pi";
import { TbBrandBilibili } from "react-icons/tb";

const socialLinks = [
  {
    icon: FiGithub,
    href: "https://github.com/flower0wine",
    label: "GitHub",
  },
  {
    icon: TbBrandBilibili,
    href: "https://space.bilibili.com/1046143905",
    label: "哔哩哔哩",
  },
  {
    icon: FiMail,
    href: "mailto:flowerwine8023@gmail.com",
    label: "flowerwine8023@gmail.com",
  },
  {
    icon: FiTwitter,
    href: "https://x.com/lzh21479207",
    label: "Twitter",
  },
  {
    icon: FiYoutube,
    href: "https://www.youtube.com/@flower0wine",
    label: "YouTube",
  },
  {
    icon: PiWechatLogo,
    href: "https://weixin.qq.com/",
    label: "lizhi2914518090",
  },
];

export function HeroSection() {
  return (
    <section className="px-4 pt-[120px] text-center">
      <div className="mx-auto max-w-4xl">
        {/* 头像和基本信息 */}
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className={cn(
              "relative mb-6 h-32 w-32 overflow-hidden rounded-full",
              "ring-black/10 dark:ring-white/10",
              "transform-gpu"
            )}
          >
            <div
              style={{ "--size": 100, "--anchor": 90 } as React.CSSProperties}
              className={cn(
                "h-full w-full",
                "after:bg-[conic-gradient(transparent_0deg,transparent_210deg,#ffaa40_270deg,#9c40ff_352deg,transparent_360deg)]",
                "after:block after:h-full after:w-full after:animate-rotate"
              )}
            ></div>
            <Image
              src="/images/avatar.png"
              alt="flowerwine"
              fill
              sizes="8rem"
              className={cn(
                "rounded-full object-cover",
                "m-auto !h-[98%] !w-[98%]",
                "shadow-inner"
              )}
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className={cn(
                "mb-4 text-3xl font-bold text-black md:text-5xl dark:text-white",
                "transition-all duration-300"
              )}
            >
              flowerwine
            </h1>
            <p
              className={cn(
                "mb-6 text-lg font-medium text-black/60 dark:text-white/60",
                "transition-all duration-300"
              )}
            >
              全栈开发工程师
            </p>
          </motion.div>
        </div>

        {/* 个人简介 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "mx-auto mb-8 max-w-2xl text-center text-base text-black/80 md:text-xl dark:text-white/80",
            "transition-all duration-300"
          )}
        >
          热爱技术，专注于 Web 开发和用户体验设计。 擅长 React、TypeScript 和
          Node.js， 致力于创造优雅且高效的数字解决方案。
        </motion.p>

        {/* 社交链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative rounded-full p-2",
                "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white",
                "transition-colors duration-300"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-6 w-6" />
              <span
                className={cn(
                  "absolute -bottom-8 left-1/2 -translate-x-1/2",
                  "rounded-md bg-black/80 px-2 py-1",
                  "whitespace-nowrap text-xs text-white",
                  "opacity-0 transition-opacity group-hover:opacity-100",
                  "dark:bg-white/80 dark:text-black"
                )}
              >
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
