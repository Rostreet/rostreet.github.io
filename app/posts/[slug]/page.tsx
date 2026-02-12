import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BackToTop from "@/components/BackToTop";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ShareButton from "@/components/ShareButton";
import TableOfContents from "@/components/TableOfContents";
import { getAllPostSlugs, getPost } from "@/lib/posts";

// 生成标题 ID 的工具函数
function generateHeadingId(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w\u4e00-\u9fa5-]+/g, "") // 保留中文字符
		.replace(/--+/g, "-")
		.replace(/^-+|-+$/g, "");
}

// 自定义标题组件，添加 ID 用于目录导航
interface HeadingProps {
	level: number;
	children?: React.ReactNode;
}

function Heading({ level, children }: HeadingProps) {
	// 提取文本内容
	const getTextContent = (node: React.ReactNode): string => {
		if (typeof node === "string") return node;
		if (typeof node === "number") return node.toString();
		if (Array.isArray(node)) return node.map(getTextContent).filter(Boolean).join("");
		if (
			React.isValidElement(node) &&
			node.props &&
			typeof node.props === "object" &&
			"children" in node.props
		) {
			return getTextContent((node.props as { children?: React.ReactNode }).children);
		}
		return "";
	};

	const text = getTextContent(children) || "";
	const id = generateHeadingId(text) || `heading-${Math.random().toString(36).substr(2, 9)}`;

	const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

	return (
		<Tag id={id} className="scroll-mt-24">
			{children}
		</Tag>
	);
}

export async function generateStaticParams() {
	return getAllPostSlugs().map((slug) => ({
		slug,
	}));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = getPost(slug);

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-3xl font-bold mb-4">文章未找到</h1>
					<Link href="/" className="text-primary hover:underline">
						返回首页
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
			<ReadingProgressBar />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Main Content */}
				<article className="lg:col-span-9 max-w-none animate-fade-in">
					{/* Back Button */}
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 group"
					>
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
						返回首页
					</Link>

					{/* Article Header */}
					<header className="mb-12">
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
							{post.title}
						</h1>

						<div className="flex items-center justify-between gap-4">
							<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span className="px-3 py-1 rounded-full bg-accent text-foreground font-medium">
									{post.category}
								</span>
								<span className="text-muted-foreground/50">·</span>
								<span className="flex items-center gap-1.5">
									<Calendar className="w-3.5 h-3.5" />
									{post.date}
								</span>
								<span className="text-muted-foreground/50">·</span>
								<span className="flex items-center gap-1.5">
									<Clock className="w-3.5 h-3.5" />
									{post.readTime}
								</span>
							</div>
							<ShareButton title={post.title} />
						</div>
					</header>

					{/* Article Content */}
					<div className="border-t border-border/40 pt-8">
						<div
							className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:first:mt-0
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-7 prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-foreground prose-code:bg-accent prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-muted prose-pre:border prose-pre:border-border/40
            prose-ul:text-muted-foreground prose-ul:ml-6
            prose-ol:text-muted-foreground prose-ol:ml-6
            prose-li:text-muted-foreground
            prose-blockquote:border-l-4 prose-blockquote:border-border/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
          "
						>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									h1: (props) => <Heading level={1} {...props} />,
									h2: (props) => <Heading level={2} {...props} />,
									h3: (props) => <Heading level={3} {...props} />,
									h4: (props) => <Heading level={4} {...props} />,
									h5: (props) => <Heading level={5} {...props} />,
									h6: (props) => <Heading level={6} {...props} />,
								}}
							>
								{post.content}
							</ReactMarkdown>
						</div>
					</div>

					{/* Article Footer */}
					<footer className="mt-16 pt-8 border-t border-border/40">
						<div className="flex flex-col sm:flex-row justify-between gap-4">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
							>
								<ArrowLeft className="w-4 h-4" />
								返回首页
							</Link>
							<div className="flex gap-4">
								<span className="text-muted-foreground">感谢阅读！</span>
							</div>
						</div>
					</footer>
				</article>

				{/* Sidebar - Table of Contents */}
				<aside className="hidden lg:block lg:col-span-3">
					<div className="sticky top-24">
						<TableOfContents content={post.content} />
					</div>
				</aside>
			</div>

			{/* Back to Top Button */}
			<BackToTop />
		</div>
	);
}
