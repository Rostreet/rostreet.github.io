export interface Post {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  excerpt: string;
  slug: string;
}

export interface PostMeta {
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  excerpt: string;
  slug: string;
}

export type PostsMap = Record<string, Post>;
