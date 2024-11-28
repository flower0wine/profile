"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { WorksSection } from "@/components/works/works-section";
import type { Work } from "@/types/work";

interface WorksClientProps {
  works: Work[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function WorksClient({ works }: WorksClientProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen pb-20 pt-16"
    >
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>

      <motion.div variants={itemVariants}>
        <WorksSection works={works} />
      </motion.div>
    </motion.main>
  );
}
