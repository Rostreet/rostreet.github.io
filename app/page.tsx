import { Mail, MapPin } from "lucide-react";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 md:py-16">
			<div className="mx-auto max-w-4xl">
				<header className="animate-fade-in">
					<div className="mt-8 max-w-3xl space-y-6 text-muted-foreground">
						<div className="space-y-1.5">
							<p className="text-base leading-8 sm:text-[17px]">你好👋，欢迎来到我的博客</p>
							<p className="text-sm leading-6 text-muted-foreground/80 sm:text-[14px]">
								Hello there, welcome to my blog.
							</p>
						</div>

						<div className="space-y-1.5">
							<p className="text-base leading-8 sm:text-[17px]">
								我叫翟常昊，是一位大学生。日常主要使用 React、Next.js、Node.js 和 Python
								来进行开发，顺便鼓捣一些新奇的小玩意。
							</p>
							<p className="text-sm leading-6 text-muted-foreground/80 sm:text-[14px]">
								I&apos;m Changhao Zhai, a college student who mainly builds with React, Next.js,
								Node.js and Python, while also tinkering with new ideas for fun.
							</p>
						</div>

						<div className="space-y-1.5">
							<p className="text-base leading-8 sm:text-[17px]">
								这个网站现在主要承载我的项目、博客和兴趣内容，用来持续记录我的学习、实践与思考，欢迎你常来看看。
							</p>
							<p className="text-sm leading-6 text-muted-foreground/80 sm:text-[14px]">
								This site now serves as a home for my projects, blog posts and interests, where I
								keep documenting what I learn, build and think about.
							</p>
						</div>
					</div>
				</header>

				<section className="section-divider mt-12 pt-8 animate-fade-in">
					<div className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
							Education
						</p>
						<div className="space-y-5">
							<div className="border-b border-border/45 pb-5">
								<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
									<div>
										<h2 className="text-lg font-medium">华中农业大学</h2>
										<p className="mt-1 text-sm text-muted-foreground">信息管理与信息系统</p>
									</div>
									<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
										2023.09 - 2027.06
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section-divider mt-12 pt-8 animate-fade-in">
					<div className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
							Experience
						</p>
						<div className="space-y-5">
							<div className="border-b border-border/45 pb-5">
								<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
									<div>
										<h2 className="text-lg font-medium">Shopee</h2>
										<p className="mt-1 text-sm text-muted-foreground">前端开发实习生</p>
									</div>
									<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
										2025.08 - 2025.12
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section-divider mt-12 pt-8 animate-fade-in">
					<div className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
							Base
						</p>
						<div className="space-y-4 text-sm text-muted-foreground sm:text-[15px]">
							<a
								href="mailto:feaaizch1001@gmail.com"
								className="flex items-center gap-3 hover:text-foreground"
							>
								<Mail className="h-4 w-4" />
								1776978150@qq.com
							</a>
							<div className="flex items-center gap-3">
								<MapPin className="h-4 w-4" />
								中国 湖北 武汉
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
