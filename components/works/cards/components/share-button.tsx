import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useShare } from "@/hooks/use-share";

interface ShareButtonProps {
  onShare: () => void;
  className?: string;
}

export function ShareButton({ onShare, className }: ShareButtonProps) {
  const { isShareSupported } = useShare();

  return (
    isShareSupported && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShare}
        className={cn(
          "rounded-full p-2",
          "hover:bg-muted",
          "transition-colors",
          className
        )}
        title="分享"
      >
        <Share2 className="h-4 w-4" />
      </motion.button>
    )
  );
}
