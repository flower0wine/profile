import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blog";
import { BlogClient } from "../blog-client";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";
import { QueryProvider } from "@/components/query-provider";
import { generateMetadata } from "@/components/seo/metadata-generator";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata = generateMetadata({
  title: "作品集 | 我的个人网站",
  description: "展示我的项目作品和创意工作",
  keywords: ["作品集", "项目展示", "个人作品", "开发项目"],
});

export default async function BlogPage({ params }: BlogPageProps) {
  // 等待参数解析完成
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id, blog.tags);

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <QueryProvider>
        <BlogClient blog={blog} relatedBlogs={relatedBlogs} />
      </QueryProvider>
    </Suspense>
  );
}
