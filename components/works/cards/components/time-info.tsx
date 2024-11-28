import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/format-date";

interface TimeInfoProps {
  createdAt: string;
  className?: string;
}

export function TimeInfo({ createdAt, className }: TimeInfoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
    >
      <Calendar className="h-4 w-4" />
      <time dateTime={createdAt}>{formatDate(createdAt)}</time>
    </div>
  );
}
