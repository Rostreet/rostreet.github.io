'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Search, X, Mail, Github } from 'lucide-react';
import PostCardSkeleton from '@/components/PostCardSkeleton';

// iconfont.cn 图标组件
const BilibiliIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor">
    <path d="M306.76 909.227c63.08 0 98.487-27.574 119.251-73.98l-253.615-152.168C117.587 686.96 64.436 621.506 17.72 524.56 5.236 497.893 0 475.453 0 456.107V342.55c0-35.936 5.237-67.84 15.474-95.7l252.625-151.594c-19.76-46.021-55.027-73.334-117.538-73.334zM381.4 310.868l-275.395 165.29c-33.794 20.294-55.547 57.013-55.547 97.125v180.19c0 84.197 68.473 152.44 153.025 152.44 40.227 0 77.213-15.636 105.092-41.136l277.5-166.487c-50.987-34.867-85.675-93.134-85.675-159.687 0-66.036 34.347-124.043 84.625-158.757l-0.126-0.083z m340.96 0c50.278 34.714 84.624 92.72 84.624 158.756 0 66.553-34.687 124.82-85.674 159.687l277.5 166.487c27.88 25.5 64.865 41.136 105.092 41.136 84.552 0 153.025-68.243 153.025-152.44v-180.19c0-40.112-21.753-76.83-55.547-97.125L587.352 310.868c50.987 34.867 85.675 93.134 85.675 159.687 0-66.036-34.347-124.043-84.625-158.757l0.125 0.083z" />
  </svg>
);

const JuejinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 768-448 768-247.4 0-448-200.6-448-448zm0 832c-212.1 0-384-171.9-384-384s171.9-384 384-384 384 171.9 384 384-171.9 384-384 384zm200.7-495.1l-245.1 185.2c-3.2 2.4-8 2.4-11.2 0L211.3 400.9c-4.5-3.4-5.5-9.8-2.1-14.3 3.4-4.5 9.8-5.5 14.3-2.1l248.8 188c2.7 2 6 2.9 9.3 1.6 3.3-1.3 5.3-4.8 4.3-8.3L403.1 347.6c-4.5-1-9.1 1.8-10.1 6.3-1 4.5 1.8 9.1 6.3 10.1l313.4 71.6c1.1 0.3 2.3 0.4 3.4 0.1 3.2-0.9 5.3-3.8 4.6-7l-3.3-15.8z" />
  </svg>
);

const POSTS_PER_PAGE = 10;

const allPosts = [
  {
    id: 1,
    slug: 'getting-started-with-nextjs',
    title: '开始使用 Next.js 构建现代化应用',
    excerpt: '探索 Next.js 15 的强大功能，包括服务端组件、App Router 以及最新的性能优化特性。了解如何使用这个强大的 React 框架构建高性能的 Web 应用。',
    date: '2024-12-28',
    readTime: '5 分钟',
    category: '前端开发',
  },
  {
    id: 2,
    slug: 'understanding-react-server-components',
    title: '深入理解 React Server Components',
    excerpt: 'React Server Components 彻底改变了我们构建 React 应用的方式。让我们深入了解其工作原理、使用场景以及最佳实践。',
    date: '2024-12-27',
    readTime: '8 分钟',
    category: 'React',
  },
  {
    id: 3,
    slug: 'typescript-best-practices',
    title: 'TypeScript 最佳实践指南',
    excerpt: '提升你的 TypeScript 代码质量，学习类型系统的高级用法、泛型、条件类型和常见模式的实现。',
    date: '2024-12-26',
    readTime: '6 分钟',
    category: 'TypeScript',
  },
];

const categories = ['全部', ...Array.from(new Set(allPosts.map(post => post.category)))];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState<typeof allPosts>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 筛选文章
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 重置页码和显示的文章当筛选改变时
  useEffect(() => {
    setPage(1);
    setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
    setInitialLoading(false);
  }, [selectedCategory, searchQuery]);

  // 无限滚动
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && displayedPosts.length < filteredPosts.length) {
          setLoading(true);
          // 模拟网络延迟
          setTimeout(() => {
            const nextPage = page + 1;
            const newPosts = filteredPosts.slice(0, nextPage * POSTS_PER_PAGE);
            setDisplayedPosts(newPosts);
            setPage(nextPage);
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, displayedPosts.length, filteredPosts.length, page]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧个人信息 */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start animate-fade-in">
          <div className="space-y-6">
            {/* 头像卡片 */}
            <div className="border border-border/40 rounded-xl p-6 bg-card text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-3xl font-bold">Z</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Zhai Changhao</h2>
              <p className="text-muted-foreground text-sm mb-4">全栈开发者</p>

              {/* 联系方式 - 只显示图标 */}
              <div className="flex justify-center gap-3 mb-4">
                <a
                  href="mailto:hello@example.com"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://bilibili.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="Bilibili"
                >
                  <BilibiliIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://juejin.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="稀土掘金"
                >
                  <JuejinIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="border-t border-border/40 pt-4">
                <p className="text-sm italic text-muted-foreground">
                  &quot;代码改变世界，创新驱动未来&quot;
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧文章列表 */}
        <main className="lg:col-span-8 space-y-6">
          {/* 搜索框 */}
          <div className="border border-border/40 rounded-xl p-4 bg-card">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border/40 bg-accent focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-accent text-foreground hover:bg-accent/80'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 文章列表 */}
          <div className="space-y-4">
            {initialLoading ? (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            ) : displayedPosts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                没有找到匹配的文章
              </div>
            ) : (
              displayedPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="block rounded-xl border border-border/40 bg-card hover:border-border/80 transition-all duration-200 animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6">
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
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* 加载更多指示器 */}
          {displayedPosts.length < filteredPosts.length && (
            <div ref={observerTarget} className="text-center py-8">
              {loading ? (
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">加载中...</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">向下滚动加载更多</p>
              )}
            </div>
          )}

          {/* 显示统计信息 */}
          {filteredPosts.length > 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              显示 {displayedPosts.length} / {filteredPosts.length} 篇文章
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
