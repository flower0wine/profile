"use client";

import { motion } from "framer-motion";
import { FlowerWineQuote } from "./flowerwine-quote";

const sectionVariants = {
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
      bounce: 0.4,
    },
  },
};

export function PhilosophySection() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* 区域标题 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-bold"
        >
          哲思分享
          <span className="mt-2 block text-lg font-normal text-muted-foreground">
            分享每个人都应该具有的思想
          </span>
        </motion.h2>

        {/* 金句展示 */}
        <motion.div
          variants={sectionVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FlowerWineQuote />
        </motion.div>
      </div>
    </section>
  );
}
