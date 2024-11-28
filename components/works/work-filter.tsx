"use client";

import { SegmentedControl } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { type WorkType } from "@/types/work";
import { workDictionary, types } from "@/lib/constants";

interface WorkFilterProps {
  selectedType: WorkType | "all";
  onSelectType: (type: WorkType | "all") => void;
}

export function WorkFilter({ selectedType, onSelectType }: WorkFilterProps) {
  return (
    <div className="flex w-full justify-center">
      <div
        className={cn(
          "scrollbar-none max-w-full overflow-auto rounded-full",
          "bg-background/50"
        )}
      >
        {/* 新增的滚动容器 */}
        <div className="inline-flex min-w-max justify-center">
          {/* 确保内容不会被压缩 */}
          <SegmentedControl.Root
            size="2"
            radius="full"
            value={selectedType}
            onValueChange={value => onSelectType(value as WorkType | "all")}
          >
            {types.map(type => (
              <SegmentedControl.Item
                key={type}
                value={type}
                className={cn(
                  "flex items-center gap-2 rounded-full",
                  "transition-all duration-300",
                  "border-2 border-solid border-transparent",
                  "hover:bg-secondary/20",
                  "dark:hover:bg-accent/80",
                  type === selectedType &&
                    cn("bg-secondary/2 dark:bg-accent/80")
                )}
              >
                <span className="transition-colors">
                  {workDictionary[type]}
                </span>
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.Root>
        </div>
      </div>
    </div>
  );
}
