import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

const allPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: '开始使用 Next.js 构建现代化应用',
    excerpt: '探索 Next.js 15 的强大功能，包括服务端组件、App Router 以及最新的性能优化特性。',
    date: '2024-12-28',
    readTime: '5 分钟',
    category: '前端开发',
  },
  {
    slug: 'understanding-react-server-components',
    title: '深入理解 React Server Components',
    excerpt: 'React Server Components 彻底改变了我们构建 React 应用的方式。让我们深入了解其工作原理。',
    date: '2024-12-27',
    readTime: '8 分钟',
    category: 'React',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript 最佳实践指南',
    excerpt: '提升你的 TypeScript 代码质量，学习类型系统的高级用法和常见模式的实现。',
    date: '2024-12-26',
    readTime: '6 分钟',
    category: 'TypeScript',
  },
  {
    slug: 'building-scalable-apis',
    title: '构建可扩展的 API 架构',
    excerpt: '学习如何设计能够随着业务增长而扩展的 API 系统，包括微服务架构和性能优化策略。',
    date: '2024-12-25',
    readTime: '10 分钟',
    category: '后端开发',
  },
  {
    slug: 'modern-css-techniques',
    title: '现代 CSS 技术探索',
    excerpt: '从 CSS Grid 到 Container Queries，探索现代 CSS 提供的强大布局能力和新特性。',
    date: '2024-12-24',
    readTime: '7 分钟',
    category: 'CSS',
  },
];

const categories = ['全部', '前端开发', 'React', 'TypeScript', '后端开发', 'CSS'];

export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            文章
          </h1>
          <p className="text-xl text-muted-foreground">
            分享技术见解和学习心得
          </p>
        </header>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${category === '全部'
                    ? 'bg-foreground text-background'
                    : 'bg-accent text-foreground hover:bg-accent/80'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {allPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block rounded-xl border border-border/40 bg-card hover:border-border/80 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent text-foreground font-medium text-xs">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all disabled:opacity-50"
              disabled
            >
              上一页
            </button>
            <button className="px-4 py-2 rounded-lg bg-foreground text-background">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all">
              3
            </button>
            <button className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
