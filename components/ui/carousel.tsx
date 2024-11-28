"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
}

type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

interface CarouselProps {
  images: CarouselImage[];
  options?: CarouselOptions;
  className?: string;
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "custom";
  customRatio?: string;
  imageClassName?: string;
  dotClassName?: string;
}

export function Carousel({
  images,
  options = { loop: true, align: "start" },
  className,
  autoplay = true,
  interval = 4000,
  showDots = true,
  aspectRatio = "video",
  customRatio,
  imageClassName,
  dotClassName,
}: CarouselProps) {
  const [autoplayOptions] = useState({
    delay: interval,
    stopOnInteraction: false,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay ? [Autoplay(autoplayOptions)] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    custom: customRatio,
  }[aspectRatio];

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden rounded-xl">
        <div className="flex touch-pan-y">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                "relative min-w-0 flex-[0_0_100%]",
                aspectRatioClass
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={cn("object-cover", imageClassName)}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 指示器圆点 */}
      {showDots && (
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? cn("w-6 bg-white", dotClassName)
                  : cn(
                      "w-2 bg-white/50 hover:bg-white/75",
                      "dark:bg-white/30 dark:hover:bg-white/50",
                      dotClassName
                    )
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
