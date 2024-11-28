import type { CodeWork } from "@/types/work";

export const codeWorks: CodeWork[] = [
  {
    id: "1111",
    type: "code" as const,
    title: "自定义 React Hooks",
    description: "一个用于处理窗口大小变化的自定义 React Hook",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`,
    sourceUrl: "https://github.com/yourusername/hooks/useWindowSize",
    tags: ["React", "Hooks", "TypeScript", "响应式"],
    createdAt: "2024-01-15",
  },
  {
    id: "bbbb",
    type: "code" as const,
    title: "Tailwind CSS 动画组件",
    description: "一个使用 Tailwind CSS 实现的优雅加载动画",
    language: "TSX",
    code: `export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 animate-ping rounded-full 
             bg-primary/30"></div>
        <div className="absolute inset-2 animate-spin rounded-full 
             border-2 border-transparent 
             border-t-primary"></div>
      </div>
    </div>
  );
}`,
    sourceUrl: "https://github.com/yourusername/ui/components/loading",
    tags: ["React", "Tailwind CSS", "动画", "组件"],
    createdAt: "2024-01-20",
  },
  {
    id: "aaaa",
    type: "code" as const,
    title: "Next.js API 路由示例",
    description: "使用 Next.js API 路由实现的简单 CRUD 接口",
    language: "TypeScript",
    code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const data = await db.users.findUnique({
      where: { id },
    });
    
    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}`,
    sourceUrl: "https://github.com/yourusername/nextjs-api-examples",
    tags: ["Next.js", "API", "TypeScript", "后端"],
    createdAt: "2024-01-25",
  },
];
