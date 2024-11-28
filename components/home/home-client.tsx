"use client";

import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/home/hero-section";
import { motion } from "framer-motion";
import { TechStack } from "@/components/home/tech-stack";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { Footer } from "@/components/layout/footer";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // 子元素之间的延迟时间
      delayChildren: 0.2, // 整体动画开始前的延迟
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // 每个元素的动画持续时间
      ease: "easeOut",
    },
  },
};

export function HomeClient() {
  return (
    <>
      <motion.main
        className="relative min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TechStack />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <FeaturedProducts />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <PhilosophySection />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>
      </motion.main>
    </>
  );
}
