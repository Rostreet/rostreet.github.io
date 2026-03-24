"use client";

import { Calendar, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { blogPosts } from "@/lib/blog-posts";

const POSTS_PER_PAGE = 10;

const categoryCounts = blogPosts.reduce(
	(acc, post) => {
		acc[post.category] = (acc[post.category] || 0) + 1;
		return acc;
	},
	{} as Record<string, number>
);

const categories = ["全部", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export default function BlogFeed({ className = "" }: { className?: string }) {
	const [selectedCategory, setSelectedCategory] = useState("全部");
	const [searchQuery, setSearchQuery] = useState("");
	const [displayedPosts, setDisplayedPosts] = useState<typeof blogPosts>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const observerTarget = useRef<HTMLDivElement>(null);

	const filteredPosts = useMemo(
		() =>
			blogPosts.filter((post) => {
				const matchesCategory = selectedCategory === "全部" || post.category === selectedCategory;
				const normalizedQuery = searchQuery.toLowerCase();
				const matchesSearch =
					normalizedQuery === "" ||
					post.title.toLowerCase().includes(normalizedQuery) ||
					post.excerpt.toLowerCase().includes(normalizedQuery);

				return matchesCategory && matchesSearch;
			}),
		[searchQuery, selectedCategory]
	);

	useEffect(() => {
		startTransition(() => {
			setPage(1);
			setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
			setInitialLoading(false);
		});
	}, [filteredPosts]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading && displayedPosts.length < filteredPosts.length) {
					setLoading(true);
					window.setTimeout(() => {
						const nextPage = page + 1;
						setDisplayedPosts(filteredPosts.slice(0, nextPage * POSTS_PER_PAGE));
						setPage(nextPage);
						setLoading(false);
					}, 500);
				}
			},
			{ threshold: 0.1 }
		);

		const target = observerTarget.current;
		if (target) {
			observer.observe(target);
		}

		return () => observer.disconnect();
	}, [displayedPosts.length, filteredPosts, loading, page]);

	return (
		<div className={className}>
			<div className="animate-fade-in">
				<div className="flex flex-col gap-4">
					<div className="max-w-2xl">
						<div className="relative border-b border-border/55 pb-2.5">
							<Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<input
								type="text"
								placeholder="搜索文章标题或内容..."
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								className="w-full bg-transparent pl-8 pr-8 text-sm text-foreground outline-none placeholder:text-muted-foreground/78"
							/>
							{searchQuery ? (
								<button
									type="button"
									onClick={() => setSearchQuery("")}
									className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									aria-label="清除搜索"
								>
									<X className="h-4 w-4" />
								</button>
							) : null}
						</div>
					</div>

					<div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
						{categories.map((category) => {
							const count = category === "全部" ? blogPosts.length : categoryCounts[category] || 0;
							const isSelected = selectedCategory === category;

							return (
								<button
									type="button"
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`inline-flex items-center gap-2 transition-colors ${
										isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
									}`}
									aria-label={`筛选 ${category} 分类，有 ${count} 篇文章`}
									aria-pressed={isSelected}
								>
									<span className="font-medium">{category}</span>
									<span className="text-xs text-muted-foreground">{count}</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>

			<div className="mt-7">
				{initialLoading ? (
					<>
						<PostCardSkeleton />
						<PostCardSkeleton />
						<PostCardSkeleton />
					</>
				) : displayedPosts.length === 0 ? (
					<div className="py-16 text-center text-sm text-muted-foreground">没有找到匹配的文章</div>
				) : (
					displayedPosts.map((post, index) => (
						<Link
							key={post.id}
							href={`/posts/${post.slug}`}
							className="group block border-b border-border/40 py-6 transition-colors duration-200 animate-fade-in hover:border-foreground/22"
							style={{ animationDelay: `${index * 50}ms` }}
						>
							<div className="space-y-3">
								<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
									<span className="font-medium tracking-[0.16em] text-foreground/84">
										{post.category}
									</span>
									<span className="flex items-center gap-1">
										<Calendar className="h-3.5 w-3.5" />
										{post.date}
									</span>
									<span className="flex items-center gap-1">
										<Clock className="h-3.5 w-3.5" />
										{post.readTime}
									</span>
								</div>
								<h3 className="text-[1.7rem] font-semibold tracking-tight transition-colors duration-200 group-hover:text-foreground/86 sm:text-[1.9rem]">
									{post.title}
								</h3>
								<p className="max-w-3xl text-sm leading-6.5 text-muted-foreground sm:text-[15px]">
									{post.excerpt}
								</p>
							</div>
						</Link>
					))
				)}
			</div>

			{displayedPosts.length < filteredPosts.length ? (
				<div ref={observerTarget} className="text-center py-8">
					{loading ? (
						<div className="inline-flex items-center gap-2 text-muted-foreground">
							<div className="h-4 w-4 rounded-full border border-foreground/30 border-t-transparent animate-spin" />
							<span className="text-sm">加载中...</span>
						</div>
					) : (
						<p className="text-sm text-muted-foreground">向下滚动加载更多</p>
					)}
				</div>
			) : null}

			{filteredPosts.length > 0 ? (
				<div className="text-center text-sm text-muted-foreground py-4">
					显示 {displayedPosts.length} / {filteredPosts.length} 篇文章
				</div>
			) : null}
		</div>
	);
}
