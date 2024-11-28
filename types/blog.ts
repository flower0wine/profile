export type BlogFormat = "html" | "markdown";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  format: BlogFormat;
  coverImage: string;
  author: {
    name: string;
    image: string;
  };
  publishDate: string;
  readingTime: string;
  tags: string[];
  views?: number;
  likes?: number;
}
