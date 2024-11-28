import { useEffect, useState } from "react";

interface ShareOptions {
  title: string;
  text?: string;
  url: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
}

export function useShare() {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const share = async ({
    title,
    text,
    url,
    onSuccess,
    onError,
    onCancel,
  }: ShareOptions) => {
    if (!navigator.share) {
      console.warn("Web Share API 不可用");
      onError?.(new Error("Web Share API 不可用"));
      return;
    }

    try {
      await navigator.share({
        title,
        text,
        url,
      });
      onSuccess?.();
    } catch (error) {
      // AbortError 表示用户取消分享
      if (error instanceof Error && error.name === "AbortError") {
        console.log("分享已取消");
        onCancel?.();
        return;
      }
      console.error("分享失败:", error);
      onError?.(error);
    }
  };

  return {
    share,
    isShareSupported: canShare && !!navigator.share,
  };
}
