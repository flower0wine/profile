"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import "plyr-react/plyr.css";
import dynamic from "next/dynamic";
import type { APITypes, PlyrProps } from "plyr-react";
import "./video.css";

const Plyr = dynamic(() => import("plyr-react").then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full animate-pulse rounded-lg bg-muted" />
  ),
});

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onEnded?: () => void;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  onEnded,
  className,
}: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const plyrRef = useRef<APITypes>(null);

  // 确保组件只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  const plyrProps: PlyrProps = {
    source: {
      type: "video",
      sources: [
        {
          src,
          type: "video/mp4",
        },
      ],
      poster,
    },
    options: {
      listeners: {
        ended: () => {
          if (onEnded) {
            onEnded();
          }
        },
      },
      controls: [
        "play-large", // 大播放按钮
        "restart", // 重新播放
        "rewind", // 快退 10 秒
        "play", // 播放/暂停
        "fast-forward", // 快进 10 秒
        "progress", // 进度条
        "current-time", // 当前时间
        "duration", // 总时长
        "mute", // 静音
        "volume", // 音量
        "settings", // 设置
        "pip", // 画中画
        "fullscreen", // 全屏
      ],
      settings: ["quality", "speed", "loop"],
      keyboard: { focused: true, global: true },
      tooltips: { controls: true, seek: true },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      },
      i18n: {
        restart: "重新播放",
        rewind: "快退 {seektime} 秒",
        play: "播放",
        pause: "暂停",
        fastForward: "快进 {seektime} 秒",
        seek: "跳转",
        played: "已播放",
        buffered: "已缓冲",
        currentTime: "当前时间",
        duration: "持续时间",
        volume: "音量",
        mute: "静音",
        unmute: "取消静音",
        enableCaptions: "启用字幕",
        disableCaptions: "禁用字幕",
        enterFullscreen: "进入全屏",
        exitFullscreen: "退出全屏",
        frameTitle: "播放器",
        captions: "字幕",
        settings: "设置",
        speed: "速度",
        normal: "正常",
        quality: "画质",
        loop: "循环",
        start: "开始",
        end: "结束",
        all: "全部",
        reset: "重置",
        disabled: "禁用",
        advertisement: "广告",
        qualityBadge: {
          2160: "4K",
          1440: "HD",
          1080: "HD",
          720: "HD",
          576: "SD",
          480: "SD",
        },
      },
    },
  };

  if (!mounted) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-lg bg-muted" />
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Plyr
        ref={plyrRef}
        {...plyrProps}
        className={cn(
          "plyr-react plyr plyr--full-ui plyr--video",
          "[&_.plyr]:rounded-lg",
          "[&_.plyr--video]:bg-transparent",
          "[&_.plyr__control--overlaid]:bg-primary",
          "[&_.plyr__control--overlaid:hover]:bg-primary/90",
          "[&_.plyr--full-ui input[type=range]]:text-primary",
          "[&_.plyr__control]:hover:bg-primary/90"
        )}
      />
    </div>
  );
}
