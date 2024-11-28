import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Blog } from "@/types/blog";
import { cache } from "react";
import readingTime from "reading-time";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

// 获取所有博客
export const getAllBlogs = cache(async (): Promise<Blog[]> => {
  try {
    const files = await fs.readdir(blogsDirectory);
    const blogs = await Promise.all(
      files
        .filter(file => file.endsWith(".md") || file.endsWith(".mdx"))
        .map(async file => {
          const filePath = path.join(blogsDirectory, file);
          const fileContent = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(fileContent);

          return {
            id: data.id || file.replace(/\.mdx?$/, ""),
            slug: file.replace(/\.mdx?$/, ""),
            title: data.title,
            excerpt: data.excerpt || "",
            content,
            format: data.format || "markdown",
            coverImage: data.coverImage || "/images/1.jpg",
            author: {
              name: data.author?.name || "Anonymous",
              image: data.author?.image || "/images/2.jpg",
            },
            publishDate: data.publishDate || new Date().toISOString(),
            readingTime: readingTime(content).text,
            tags: data.tags || [],
          };
        })
    );

    // 按发布日期排序
    return blogs.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error("Error getting blogs:", error);
    return [];
  }
});

// 获取单个博客
export const getBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    try {
      const filePath = path.join(blogsDirectory, `${slug}.md`);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        id: data.id || slug,
        slug,
        title: data.title,
        excerpt: data.excerpt || "",
        content,
        format: data.format || "markdown",
        coverImage: data.coverImage || "/images/9.png",
        author: {
          name: data.author?.name || "Anonymous",
          image: data.author?.image || "/images/4.png",
        },
        publishDate: data.publishDate || new Date().toISOString(),
        readingTime: readingTime(content).text,
        tags: data.tags || [],
        views: data.views || 0,
        likes: data.likes || 0,
      };
    } catch (error) {
      console.error("Error getting blog:", error);
      return null;
    }
  }
);

// 获取相关博客
export const getRelatedBlogs = cache(
  async (currentId: string, tags: string[]): Promise<Blog[]> => {
    const allBlogs = await getAllBlogs();

    return allBlogs
      .filter(
        blog =>
          blog.id !== currentId && blog.tags.some(tag => tags.includes(tag))
      )
      .slice(0, 3);
  }
);

// 按标签获取博客
export const getBlogsByTag = cache(async (tag: string): Promise<Blog[]> => {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => blog.tags.includes(tag));
});

// 获取所有标签
export const getAllTags = cache(async (): Promise<string[]> => {
  const allBlogs = await getAllBlogs();
  const tags = new Set(allBlogs.flatMap(blog => blog.tags));
  return Array.from(tags).sort();
});

// 获取博客归档
export const getBlogArchive = cache(async () => {
  const allBlogs = await getAllBlogs();

  return allBlogs.reduce(
    (acc, blog) => {
      const year = new Date(blog.publishDate).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>
  );
});

// 增加博客浏览量
export const incrementBlogViews = async (slug: string): Promise<void> => {
  // 这里应该连接到你的数据库或者 API
  console.log(`Incrementing views for blog: ${slug}`);
};

// 点赞博客
export const likeBlog = async (slug: string): Promise<void> => {
  // 这里应该连接到你的数据库或者 API
  console.log(`Liking blog: ${slug}`);
};
