"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";

// 将类型定义抽离
interface Skill {
  name: string;
  icon: string;
  type: "inner" | "outer";
}

// 将常量配置抽离
const ROTATION_CONFIG = {
  outer: {
    radius: 200,
    duration: 40,
    iconSize: "w-16 h-16",
    direction: 1,
  },
  inner: {
    radius: 120,
    duration: 30,
    iconSize: "w-12 h-12",
    direction: -1,
  },
} as const;

// 将技能数据抽离到单独的配置文件中
const SKILLS: Skill[] = [
  // 外圈技能 - 主要技术栈
  {
    name: "React",
    icon: "https://skillicons.dev/icons?i=react",
    type: "outer",
  },
  {
    name: "Vue",
    icon: "https://skillicons.dev/icons?i=vue",
    type: "outer",
  },
  {
    name: "Next.js",
    icon: "https://skillicons.dev/icons?i=nextjs",
    type: "outer",
  },
  {
    name: "TypeScript",
    icon: "https://skillicons.dev/icons?i=ts",
    type: "outer",
  },
  {
    name: "JavaScript",
    icon: "https://skillicons.dev/icons?i=js",
    type: "outer",
  },
  {
    name: "Node.js",
    icon: "https://skillicons.dev/icons?i=nodejs",
    type: "outer",
  },
  {
    name: "TailwindCSS",
    icon: "https://skillicons.dev/icons?i=tailwind",
    type: "outer",
  },
  {
    name: "PostgreSQL",
    icon: "https://skillicons.dev/icons?i=postgresql",
    type: "outer",
  },
  {
    name: "Python",
    icon: "https://skillicons.dev/icons?i=python",
    type: "outer",
  },
  {
    name: "Docker",
    icon: "https://skillicons.dev/icons?i=docker",
    type: "outer",
  },
  { name: "Jest", icon: "https://skillicons.dev/icons?i=jest", type: "outer" },
  {
    name: "Spring",
    icon: "https://skillicons.dev/icons?i=spring",
    type: "outer",
  },

  // 内圈技能 - 工具和其他技术
  { name: "Git", icon: "https://skillicons.dev/icons?i=git", type: "inner" },
  {
    name: "MySQL",
    icon: "https://skillicons.dev/icons?i=mysql",
    type: "inner",
  },
  {
    name: "GitHub",
    icon: "https://skillicons.dev/icons?i=github",
    type: "inner",
  },
  {
    name: "VSCode",
    icon: "https://skillicons.dev/icons?i=vscode",
    type: "inner",
  },
  { name: "Vim", icon: "https://skillicons.dev/icons?i=vim", type: "inner" },
  {
    name: "Redis",
    icon: "https://skillicons.dev/icons?i=redis",
    type: "inner",
  },
  {
    name: "Linux",
    icon: "https://skillicons.dev/icons?i=linux",
    type: "inner",
  },
  {
    name: "Nginx",
    icon: "https://skillicons.dev/icons?i=nginx",
    type: "inner",
  },
  { name: "Java", icon: "https://skillicons.dev/icons?i=java", type: "inner" },
  { name: "Scss", icon: "https://skillicons.dev/icons?i=scss", type: "inner" },
];

// 抽离可复用的动画变体
const skillItemVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.95 },
};

// 抽离计算位置的工具函数
const calculatePosition = (index: number, total: number, radius: number) => {
  const angle = (index * 2 * Math.PI) / total;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

// 抽离单个技能图标组件
const SkillIcon = ({
  skill,
  index,
  total,
  config,
}: {
  skill: Skill;
  index: number;
  total: number;
  config: typeof ROTATION_CONFIG.outer | typeof ROTATION_CONFIG.inner;
}) => {
  const position = useMemo(
    () => calculatePosition(index, total, config.radius),
    [index, total, config.radius]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        x: position.x,
        y: position.y,
      }}
      variants={skillItemVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div className="group relative -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={cn(config.iconSize, "relative")}
          animate={{
            rotate: 360 * config.direction * -1,
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            fill
            sizes="4rem"
            className={cn(
              "rounded-2xl p-2",
              "bg-background/50 backdrop-blur-sm",
              "shadow-lg"
            )}
          />
        </motion.div>
        {/* 发光效果 */}
        <motion.div
          className={cn(
            "absolute -inset-3 -z-10 rounded-3xl blur-xl",
            "bg-blue-400/30 group-hover:bg-blue-500/50",
            "dark:bg-blue-500/50 dark:group-hover:bg-blue-400/70"
          )}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// 抽离技能环组件
const SkillRing = ({ type }: { type: "inner" | "outer" }) => {
  const skills = useMemo(
    () => SKILLS.filter(skill => skill.type === type),
    [type]
  );

  const config = ROTATION_CONFIG[type];

  return (
    <motion.div
      className="absolute"
      animate={{
        rotate: 360 * config.direction,
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: config.radius * 2,
        height: config.radius * 2,
      }}
    >
      {skills.map((skill, index) => (
        <SkillIcon
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          config={config}
        />
      ))}
    </motion.div>
  );
};

const RotatingSkills = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 rounded-3xl">
        <div
          className={cn(
            "absolute inset-0",
            "bg-grid-white/10",
            "[mask-image:radial-gradient(white,transparent_70%)]"
          )}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <SkillRing type="outer" />
        <SkillRing type="inner" />

        {/* 中心图标 */}
        <motion.div
          className="group absolute z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Code className="h-16 w-16" />
            {/* 发光效果 */}
            <motion.div
              className={cn(
                "absolute -inset-3 -z-10 rounded-3xl blur-xl",
                "bg-blue-400/20 group-hover:bg-blue-500/40",
                "dark:bg-blue-500/40 dark:group-hover:bg-blue-400/60"
              )}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export function TechStack() {
  return (
    <section className={cn("mx-auto max-w-6xl py-12")}>
      <motion.h2
        className={cn("text-center text-3xl font-bold")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        技术栈
      </motion.h2>

      <RotatingSkills />
    </section>
  );
}
