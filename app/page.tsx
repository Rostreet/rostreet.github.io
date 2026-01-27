"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Search,
  X,
  Mail,
  Github,
  ChevronDown,
} from "lucide-react";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { BilibiliIcon, JuejinIcon } from "@/components/Icons";

const POSTS_PER_PAGE = 10;

const allPosts = [
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

// 计算每个分类的文章数量
const categoryCounts = allPosts.reduce(
  (acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

const categories = [
  "全部",
  ...Array.from(new Set(allPosts.map((post) => post.category))),
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPosts, setDisplayedPosts] = useState<typeof allPosts>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 筛选文章
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "全部" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
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
        if (
          entries[0].isIntersecting &&
          !loading &&
          displayedPosts.length < filteredPosts.length
        ) {
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
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, displayedPosts.length, filteredPosts.length, page]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧个人信息 */}
        <aside className="lg:col-span-4 lg:sticky lg:top-0 lg:self-start animate-fade-in">
          <div className="space-y-6">
            {/* 头像卡片 */}
            <div
              className={`
              rounded-lg p-6 bg-card text-center transition-all duration-200
              border-bleed-card
            `}
            >
              <Image
                src="/me.jpg"
                alt="Zhai Changhao"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <h2 className="text-2xl font-bold mb-2">Zhai Changhao</h2>

              {/* 联系方式 - 只显示图标 */}
              <div className="flex justify-center gap-3 mb-4">
                <a
                  href="mailto:feaaizch1001@gmail.com"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Rostreet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://space.bilibili.com/285033804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  aria-label="Bilibili"
                >
                  <BilibiliIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://juejin.cn/user/3600253306288539"
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
                  Welcome to my world!
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧文章列表 */}
        <main className="lg:col-span-8 space-y-6">
          {/* 统一的搜索和筛选卡片 */}
          <div
            className={`
            rounded-lg p-6 bg-card space-y-5 transition-all duration-200
            border-bleed-card
          `}
          >
            {/* 第一行：搜索框 + 下拉框（桌面端同行，移动端垂直） */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* 搜索框 */}
              <div className="relative flex-1">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-all duration-200 ${
                    isSearchFocused ? "scale-110 text-primary" : ""
                  }`}
                />
                <input
                  type="text"
                  placeholder="搜索文章标题或内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border border-border/40 bg-accent text-sm transition-all duration-200 ${
                    isSearchFocused
                      ? "ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10"
                      : "focus:outline-none focus:ring-2 focus:ring-primary/50"
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-full p-1 transition-all duration-200 hover:scale-110"
                    aria-label="清除搜索"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* 分类展开/收缩按钮 */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                  inline-flex items-center justify-center
                  w-12 h-12 rounded-lg border border-border/40 bg-accent
                  transition-all duration-200 shrink-0
                  ${
                    isDropdownOpen
                      ? "ring-2 ring-primary/50 border-primary/50"
                      : "hover:bg-accent/80"
                  }
                `}
                aria-label="筛选分类"
                aria-expanded={isDropdownOpen}
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* 展开的标签区域 */}
            {isDropdownOpen && (
              <div className="flex flex-wrap gap-2.5 pt-2 animate-fade-in">
                {categories.map((category) => {
                  const count =
                    category === "全部"
                      ? allPosts.length
                      : categoryCounts[category] || 0;
                  const isSelected = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        group relative px-3 py-1.5 rounded-lg text-sm font-medium
                        transition-all duration-200 ease-out
                        ${
                          isSelected
                            ? "bg-foreground text-background shadow-md shadow-foreground/20 scale-105"
                            : "bg-accent text-foreground hover:bg-accent/80 hover:scale-102"
                        }
                      `}
                      aria-label={`筛选 ${category} 分类，有 ${count} 篇文章`}
                      aria-pressed={isSelected}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {category}
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold bg-foreground/10 text-foreground">
                          {count}
                        </span>
                      </span>
                      {isSelected && (
                        <span className="absolute inset-0 rounded-lg ring-2 ring-primary/50 ring-offset-2 ring-offset-card transition-all duration-200" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
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
                  className={`
                    block rounded-lg bg-card transition-all duration-200 animate-slide-in
                    border-bleed-card
                    hover:shadow-lg hover:shadow-primary/10
                    hover:translate-x-1
                  `}
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
                <p className="text-sm text-muted-foreground">
                  向下滚动加载更多
                </p>
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
