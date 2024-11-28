"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { quotes } from "@/mock/quotes";

type Sequence = Array<
  string | number | ((element: HTMLElement | null) => void | Promise<void>)
>;

export function FlowerWineQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const typeSequenceRef = useRef<Sequence>([quotes[0].content, 3000]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % quotes.length;
        typeSequenceRef.current = [quotes[nextIndex].content, 3000];
        return nextIndex;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative mx-auto max-w-4xl px-4 py-20",
        "overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-background/50 via-background/50 to-background/50"
      )}
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className={cn(
            "absolute -left-32 top-0 h-64 w-64",
            "rounded-full bg-red-500/10 blur-[100px]"
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
        <motion.div
          className={cn(
            "absolute -right-32 bottom-0 h-64 w-64",
            "rounded-full bg-blue-500/10 blur-[100px]"
          )}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      {/* 引号装饰 */}
      <Quote
        className={cn(
          "absolute left-8 top-8",
          "h-12 w-12 rotate-180",
          "text-muted-foreground/20"
        )}
      />
      <Quote
        className={cn(
          "absolute bottom-8 right-8",
          "h-12 w-12",
          "text-muted-foreground/20"
        )}
      />

      {/* 主要内容 */}
      <div className="relative space-y-8 text-center">
        <div className="space-y-6 px-4">
          {/* 类别标签 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center"
            >
              <span
                className={cn(
                  "rounded-full px-4 py-1.5",
                  "text-sm font-medium tracking-wide",
                  "bg-slate-200/80 text-slate-700",
                  "dark:bg-slate-800/50 dark:text-slate-300",
                  "transition-colors duration-300"
                )}
              >
                {quotes[currentIndex].category}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* 金句内容 */}
          <div className="relative min-h-[120px] text-center">
            <div
              className={cn(
                "text-2xl font-medium leading-relaxed tracking-tight",
                "sm:text-3xl md:text-4xl",
                "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700",
                "dark:bg-gradient-to-br dark:from-slate-300 dark:via-slate-400 dark:to-slate-300",
                "bg-clip-text text-transparent",
                "transition-colors duration-300"
              )}
            >
              <TypeAnimation
                key={currentIndex}
                sequence={typeSequenceRef.current}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
                style={{ display: "inline-block" }}
              />
            </div>
          </div>

          {/* 作者署名 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground"
            >
              ——{quotes[currentIndex].author}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 进度指示器 */}
        <div className="flex justify-center gap-2">
          {quotes.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
