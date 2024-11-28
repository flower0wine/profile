"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { WorkType } from "@/types/work";
import { workDictionary } from "@/lib/constants";

interface WorkSearchProps {
  onSearch: (query: string) => void;
  totalWorks: number;
  selectedType: WorkType | "all";
}

export function WorkSearch({
  onSearch,
  totalWorks,
  selectedType,
}: WorkSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const placeholderText = `在 ${totalWorks} 个${workDictionary[selectedType]}作品中搜索...`;

  return (
    <motion.div
      className={`relative flex items-center rounded-full border-2 bg-background px-4 py-2 transition-all duration-300 ${
        isFocused ? "border-primary shadow-lg" : "border-border"
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <Search className="mr-2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholderText}
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        onChange={e => onSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  );
}
