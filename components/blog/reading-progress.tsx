"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 h-1",
        "bg-gradient-to-r from-primary via-primary/80 to-primary",
        "origin-left"
      )}
      style={{ scaleX }}
    />
  );
}
