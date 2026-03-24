export type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

export const blogPosts: BlogPostSummary[] = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "开始使用 Next.js 构建现代化应用",
    excerpt:
      "探索 Next.js 15 的强大功能，包括服务端组件、App Router 以及最新的性能优化特性。了解如何使用这个强大的 React 框架构建高性能的 Web 应用。",
    date: "2024-12-28",
    readTime: "5 分钟",
    category: "前端开发",
  },
  {
    id: 2,
    slug: "understanding-react-server-components",
    title: "深入理解 React Server Components",
    excerpt:
      "React Server Components 彻底改变了我们构建 React 应用的方式。让我们深入了解其工作原理、使用场景以及最佳实践。",
    date: "2024-12-27",
    readTime: "8 分钟",
    category: "React",
  },
  {
    id: 3,
    slug: "typescript-best-practices",
    title: "TypeScript 最佳实践指南",
    excerpt:
      "提升你的 TypeScript 代码质量，学习类型系统的高级用法、泛型、条件类型和常见模式的实现。",
    date: "2024-12-26",
    readTime: "6 分钟",
    category: "TypeScript",
  },
];
