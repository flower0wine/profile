export function BlogSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* 搜索栏骨架 */}
      <div className="mb-8 h-10 w-full animate-pulse rounded-full bg-muted" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* 主内容区骨架 */}
        <div className="space-y-8">
          {/* 标题骨架 */}
          <div className="space-y-4">
            <div className="h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
            <div className="h-6 w-1/2 animate-pulse rounded-lg bg-muted" />
          </div>

          {/* 内容骨架 */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full animate-pulse rounded-lg bg-muted"
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            ))}
          </div>
        </div>

        {/* 侧边栏骨架 */}
        <div className="hidden space-y-8 lg:block">
          <div className="h-[200px] animate-pulse rounded-lg bg-muted" />
          <div className="h-[300px] animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
