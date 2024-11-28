"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Array<{
    id: string;
    text: string;
    level: number;
  }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav>
      <h2 className="mb-4 text-lg font-semibold">目录</h2>
      <ul className="scrollbar-sm h-full max-h-[80vh] space-y-2 overflow-y-auto overflow-x-hidden">
        {headings.map(({ id, text, level }) => (
          <motion.li
            key={id}
            className={cn(
              "transition-colors",
              level === 1 ? "ml-0" : level === 2 ? "ml-4" : "ml-8"
            )}
            whileHover={{ x: 4 }}
          >
            <a
              href={`#${id}`}
              className={cn(
                "block py-1 text-sm",
                activeId === id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={e => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {text}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
