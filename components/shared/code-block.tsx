"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Copy, Check, Code as CodeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  showHeader?: boolean;
  maxHeight?: string;
}

// 优化语言映射表
export const languageMap: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  py: "python",
  rb: "ruby",
  rs: "rust",
  go: "go",
  java: "java",
  kt: "kotlin",
  swift: "swift",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  php: "php",
  TypeScript: "typescript",
  TSX: "tsx",
  JavaScript: "javascript",
  JSX: "jsx",
};

export function CodeBlock({
  code,
  language,
  showHeader = true,
  maxHeight = "500px",
}: CodeBlockProps) {
  const { theme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const codeString = code.trim();
  const lineCount = codeString.split("\n").length;
  const mappedLanguage =
    languageMap[language]?.toLowerCase() || language || "plaintext";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border">
      {/* 代码块头部 */}
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between",
            "border-b border-border",
            "bg-muted/50 px-4 py-2"
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center",
                "rounded-lg bg-primary/10"
              )}
            >
              <CodeIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary">
                {mappedLanguage}
              </span>
              <span className="text-xs text-muted-foreground">
                {lineCount} 行代码
              </span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              "rounded-md p-2",
              "text-muted-foreground hover:bg-muted",
              "transition-colors"
            )}
            title="复制代码"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      {/* 代码内容 */}
      <div
        className={cn("scrollbar-sm overflow-auto bg-muted/50 p-4")}
        style={{ maxHeight }}
      >
        <SyntaxHighlighter
          className="![overflow:unset]"
          language={mappedLanguage}
          style={theme === "dark" ? coldarkDark : oneLight}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "14px",
          }}
          showLineNumbers
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
