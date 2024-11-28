"use client";

import { useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import sanitizeHtml from "sanitize-html";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/shared/code-block";
import type { Blog } from "@/types/blog";

interface BlogContentProps {
  blog: Blog;
  onHeadingsChange?: (
    headings: Array<{ id: string; text: string; level: number }>
  ) => void;
}

export function BlogContent({ blog, onHeadingsChange }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { format, content } = blog || {};

  // 解析文章内容中的标题
  const parseHeadings = useCallback(() => {
    if (contentRef.current && onHeadingsChange) {
      const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
      const headings = Array.from(headingElements).map(heading => {
        // 如果标题没有id，生成一个
        if (!heading.id) {
          const headingText = heading.textContent || "";
          heading.id =
            headingText
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") ||
            `heading-${Math.random().toString(36).slice(2)}`;
        }
        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName[1]),
        };
      });

      // 确保所有标题都有唯一的id
      const usedIds = new Set<string>();
      headings.forEach(heading => {
        let newId = heading.id;
        let counter = 1;
        while (usedIds.has(newId)) {
          newId = `${heading.id}-${counter}`;
          counter++;
        }
        usedIds.add(newId);

        // 更新DOM中对应标题的id
        const element = contentRef.current!.querySelector(
          `h${heading.level}[id="${heading.id}"]`
        );
        if (element) {
          element.id = newId;
          heading.id = newId;
        }
      });

      onHeadingsChange(headings);
    }
  }, [onHeadingsChange]);

  // 监听内容变化
  useEffect(() => {
    // 等待DOM更新完成后解析标题
    const timer = setTimeout(parseHeadings, 100);
    return () => clearTimeout(timer);
  }, [content, format, parseHeadings]);

  if (format === "html") {
    const sanitizedHtml = sanitizeHtml(content || "", {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "h3",
        "code",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"],
        code: ["class"],
        pre: ["class"],
        "*": ["id"], // 允许所有元素有id属性
      },
    });

    return (
      <div
        ref={contentRef}
        className={cn(
          "prose prose-lg max-w-none dark:prose-invert",
          "prose-headings:scroll-mt-20",
          "prose-pre:border prose-pre:border-border prose-pre:bg-muted"
        )}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  return (
    <div ref={contentRef}>
      <ReactMarkdown
        className={cn(
          "prose prose-lg max-w-none dark:prose-invert",
          "prose-headings:scroll-mt-20",
          "prose-pre:!bg-transparent prose-pre:!p-0",
          "prose-img:rounded-lg",
          "prose-a:text-primary hover:prose-a:text-primary/80"
        )}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
        components={{
          // 确保标题有id
          h1: ({ ...props }) => (
            <h1
              id={props.id || `h1-${Math.random().toString(36).slice(2, 9)}`}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              id={props.id || `h2-${Math.random().toString(36).slice(2, 9)}`}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              id={props.id || `h3-${Math.random().toString(36).slice(2, 9)}`}
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className?.includes("language-");

            if (isInline) {
              return (
                <code
                  className={cn("rounded-md bg-muted px-1.5 py-0.5", className)}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const match = /language-(\w+)/.exec(className || "");
            const lang = match ? match[1].toLowerCase() : "";

            return <CodeBlock code={String(children).trim()} language={lang} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
