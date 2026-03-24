import BlogFeed from "@/components/BlogFeed";

export default function BlogPage() {
	return (
		<div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 md:py-12">
			<div className="mx-auto max-w-4xl">
				<header className="animate-fade-in">
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
						Blog
					</p>
					<p className="mt-4 max-w-3xl text-[15px] leading-7 text-muted-foreground">
						这里记录笔记、思考和一些仍在生长中的想法。
					</p>
				</header>
				<BlogFeed className="mt-10" />
			</div>
		</div>
	);
}
