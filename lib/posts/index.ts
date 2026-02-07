import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostMeta } from "./types";

export type { Post, PostMeta };

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPost(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // 处理日期：gray-matter 可能将日期解析为 Date 对象
    const formatDate = (date: string | Date): string => {
      if (date instanceof Date) {
        return date.toISOString().split("T")[0];
      }
      return String(date);
    };

    return {
      slug,
      title: data.title,
      content,
      date: formatDate(data.date),
      readTime: data.readTime,
      category: data.category,
      author: data.author,
      excerpt: data.excerpt,
    };
  } catch {
    return undefined;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPost(slug))
    .filter((post): post is Post => post !== undefined)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}
