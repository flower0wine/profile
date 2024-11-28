"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface MeteorConfig {
  maxMeteors: number;
  generateInterval: number;
  baseSpeed: number;
  angle: number;
  baseLength: number;
  baseWidth: number;
  baseOpacity: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  color: string;
  angle: number;
}

interface ThemeColors {
  light: {
    background: string;
    baseHue: number;
  };
  dark: {
    background: string;
    baseHue: number;
  };
}

export function MeteorShower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const { resolvedTheme } = useTheme();

  // 使用 useMemo 缓存配置
  const config = useMemo<MeteorConfig>(
    () => ({
      maxMeteors: 12,
      generateInterval: 800,
      baseSpeed: 4,
      angle: Math.PI / 6,
      baseLength: 70,
      baseWidth: 2,
      baseOpacity: 0.4,
    }),
    []
  );

  // 使用 useMemo 缓存主题颜色
  const themeColors = useMemo<ThemeColors>(
    () => ({
      light: {
        background: "rgba(255, 255, 255, 0.95)",
        baseHue: 200,
      },
      dark: {
        background: "rgba(0, 0, 0, 0.95)",
        baseHue: 220,
      },
    }),
    []
  );

  // 创建流星的函数优化
  const createMeteor = useCallback(
    (canvas: HTMLCanvasElement): Meteor => {
      const isDark = resolvedTheme === "dark";
      const { baseHue } = themeColors[isDark ? "dark" : "light"];

      const hueVariation = Math.random() * 100;

      return {
        x: -Math.random() * 100,
        y: canvas.height * (Math.random() - 0.5),
        length: Math.random() * 40 + config.baseLength,
        speed: Math.random() * 2 + config.baseSpeed,
        opacity: Math.random() * 0.6 + config.baseOpacity,
        width: Math.random() + config.baseWidth,
        color: (baseHue + hueVariation).toString(),
        angle: config.angle,
      };
    },
    [resolvedTheme, config, themeColors]
  );

  // 绘制单个流星的函数
  const drawMeteor = useCallback(
    (ctx: CanvasRenderingContext2D, meteor: Meteor) => {
      const endX = meteor.x - meteor.length * Math.cos(meteor.angle);
      const endY = meteor.y - meteor.length * Math.sin(meteor.angle);

      const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
      gradient.addColorStop(
        0,
        `hsla(${meteor.color}, 80%, 60%, ${meteor.opacity})`
      );
      gradient.addColorStop(
        0.1,
        `hsla(${meteor.color}, 80%, 60%, ${meteor.opacity * 0.8})`
      );
      gradient.addColorStop(
        0.5,
        `hsla(${meteor.color}, 80%, 60%, ${meteor.opacity * 0.4})`
      );
      gradient.addColorStop(1, "hsla(0, 0%, 100%, 0)");

      // 主流星轨迹
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = meteor.width;
      ctx.lineCap = "round";
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // 流星尾部粒子效果
      for (let i = 0; i < 3; i++) {
        const dustLength = Math.random() * meteor.length * 0.6;
        const dustX = meteor.x - Math.cos(meteor.angle) * dustLength;
        const dustY = meteor.y - Math.sin(meteor.angle) * dustLength;
        const dustSize = Math.random() * meteor.width * 0.5;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${meteor.color}, 80%, 60%, ${meteor.opacity * 0.3})`;
        ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // 优化 canvas 大小调整
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth: width, innerHeight: height } = window;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();

    // 初始化流星
    meteorsRef.current = [createMeteor(canvas)];

    let lastGenerateTime = 0;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      const isDark = resolvedTheme === "dark";
      ctx.fillStyle = themeColors[isDark ? "dark" : "light"].background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 生成新流星
      if (
        meteorsRef.current.length < config.maxMeteors &&
        timestamp - lastGenerateTime > config.generateInterval
      ) {
        meteorsRef.current.push(createMeteor(canvas));
        lastGenerateTime = timestamp;
      }

      // 更新和绘制流星
      meteorsRef.current = meteorsRef.current.map(meteor => {
        meteor.x += meteor.speed * Math.cos(meteor.angle);
        meteor.y += meteor.speed * Math.sin(meteor.angle);

        drawMeteor(ctx, meteor);

        // 重置超出边界的流星
        if (
          meteor.x > canvas.width + meteor.length ||
          meteor.y > canvas.height + meteor.length
        ) {
          return createMeteor(canvas);
        }

        return meteor;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, createMeteor, drawMeteor, config, themeColors]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 -z-10 h-full w-full",
        "transition-opacity duration-1000"
      )}
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
